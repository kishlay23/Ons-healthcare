/// <reference types="node" />
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ── Clean slate ────────────────────────────────────────────────────────────
  await prisma.appointment.deleteMany()
  await prisma.patientStory.deleteMany()
  await prisma.treatmentMachine.deleteMany()
  await prisma.pricing.deleteMany()
  await prisma.treatment.deleteMany()
  await prisma.machine.deleteMany()
  await prisma.therapistSchedule.deleteMany()
  await prisma.therapist.deleteMany()
  await prisma.user.deleteMany()

  // ── Users ──────────────────────────────────────────────────────────────────
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@onshealthcare.in',
      phone: '+919999999997',
      password: await bcrypt.hash('admin123', 10),
      firstName: 'Admin',
      lastName: 'ONS',
      role: 'ADMIN',
    },
  })

  const patient1 = await prisma.user.create({
    data: {
      email: 'patient1@example.com',
      phone: '+919999999999',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Rajesh',
      lastName: 'Kumar',
      age: 35,
      gender: 'Male',
      role: 'PATIENT',
    },
  })

  const patient2 = await prisma.user.create({
    data: {
      email: 'patient2@example.com',
      phone: '+919999999998',
      password: await bcrypt.hash('password123', 10),
      firstName: 'Priya',
      lastName: 'Sharma',
      age: 28,
      gender: 'Female',
      role: 'PATIENT',
    },
  })

  const therapistUser = await prisma.user.create({
    data: {
      email: 'therapist1@onshealthcare.in',
      phone: '+919999999996',
      password: await bcrypt.hash('therapist123', 10),
      firstName: 'Dr. Ananya',
      lastName: 'Reddy',
      role: 'THERAPIST',
    },
  })

  console.log('✅ Users created')

  // ── Therapist ──────────────────────────────────────────────────────────────
  const therapist = await prisma.therapist.create({
    data: {
      userId: therapistUser.id,
      licenseNumber: 'MPT-HYD-001',
      specialization: 'Ortho',
      experienceYears: 10,
      qualifications: 'BPT, MPT (Orthopedics)',
      bio: 'Senior physiotherapist specialising in orthopaedic and sports rehabilitation.',
    },
  })

  // Schedules Mon–Sat (days 1–6)
  for (let day = 1; day <= 6; day++) {
    await prisma.therapistSchedule.create({
      data: {
        therapistId: therapist.id,
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '17:00',
        breakStart: '13:00',
        breakEnd: '14:00',
        isAvailable: true,
      },
    })
  }

  console.log('✅ Therapist + schedules created')

  // ── Treatments ─────────────────────────────────────────────────────────────
  const t1 = await prisma.treatment.create({
    data: {
      name: 'Manual Therapy',
      description: 'Hands-on mobilisation of joints and soft tissues to reduce pain and restore range of motion.',
      specialty: 'Ortho',
      durationMinutes: 45,
      standardSessions: 10,
      benefits: JSON.stringify(['Pain relief', 'Improved mobility', 'Reduced stiffness']),
      conditions: JSON.stringify(['Lower back pain', 'Neck pain', 'Frozen shoulder']),
      pricePerSession: 800,
    },
  })

  const t2 = await prisma.treatment.create({
    data: {
      name: 'Electrotherapy (TENS/IFT)',
      description: 'Electrical stimulation using TENS and Interferential Therapy to reduce pain and promote healing.',
      specialty: 'Ortho',
      durationMinutes: 30,
      standardSessions: 15,
      benefits: JSON.stringify(['Pain reduction', 'Muscle relaxation', 'Faster healing']),
      conditions: JSON.stringify(['Arthritis', 'Sports injuries', 'Post-surgery recovery']),
      pricePerSession: 600,
    },
  })

  const t3 = await prisma.treatment.create({
    data: {
      name: 'Ultrasound Therapy',
      description: 'Deep tissue ultrasound to promote healing of tendons and ligaments by increasing blood flow.',
      specialty: 'Ortho',
      durationMinutes: 20,
      standardSessions: 12,
      benefits: JSON.stringify(['Tissue repair', 'Inflammation reduction', 'Scar tissue breakdown']),
      conditions: JSON.stringify(['Tendonitis', 'Ligament sprains', 'Muscle tears']),
      pricePerSession: 500,
    },
  })

  const t4 = await prisma.treatment.create({
    data: {
      name: 'Stroke Rehabilitation',
      description: 'Comprehensive neurological rehabilitation for stroke survivors to regain motor control and independence.',
      specialty: 'Neuro',
      durationMinutes: 60,
      standardSessions: 30,
      benefits: JSON.stringify(['Motor function recovery', 'Balance improvement', 'Independence restoration']),
      conditions: JSON.stringify(['Stroke', 'Hemiplegia', 'Gait disorders']),
      pricePerSession: 1200,
    },
  })

  const t5 = await prisma.treatment.create({
    data: {
      name: "Parkinson's Therapy",
      description: "Specialised physiotherapy to improve gait, balance and motor function using LSVT BIG techniques.",
      specialty: 'Neuro',
      durationMinutes: 60,
      standardSessions: 20,
      benefits: JSON.stringify(['Improved gait', 'Better balance', 'Reduced tremors']),
      conditions: JSON.stringify(["Parkinson's disease", 'Movement disorders', 'Bradykinesia']),
      pricePerSession: 1100,
    },
  })

  const t6 = await prisma.treatment.create({
    data: {
      name: 'Sports Injury Recovery',
      description: 'Targeted physiotherapy for athletes recovering from acute and chronic sports injuries.',
      specialty: 'Sports',
      durationMinutes: 60,
      standardSessions: 12,
      benefits: JSON.stringify(['Full performance restoration', 'Injury prevention', 'Strength conditioning']),
      conditions: JSON.stringify(['ACL tear', 'Hamstring strain', 'Rotator cuff injury']),
      pricePerSession: 1000,
    },
  })

  const t7 = await prisma.treatment.create({
    data: {
      name: 'ACL Rehabilitation',
      description: 'Progressive 6-phase ACL rehabilitation from post-surgery to return-to-sport.',
      specialty: 'Sports',
      durationMinutes: 75,
      standardSessions: 24,
      benefits: JSON.stringify(['Knee stability', 'Strength restoration', 'Safe return to sport']),
      conditions: JSON.stringify(['ACL rupture', 'Post-ACL surgery', 'Knee instability']),
      pricePerSession: 1100,
    },
  })

  const t8 = await prisma.treatment.create({
    data: {
      name: 'Dry Needling',
      description: 'Intramuscular stimulation targeting myofascial trigger points to relieve chronic muscle pain.',
      specialty: 'Ortho',
      durationMinutes: 30,
      standardSessions: 8,
      benefits: JSON.stringify(['Trigger point release', 'Muscle relaxation', 'Pain relief']),
      conditions: JSON.stringify(['Chronic muscle pain', 'Fibromyalgia', 'Tension headaches']),
      pricePerSession: 900,
    },
  })

  console.log('✅ Treatments created')

  // ── Pricing ────────────────────────────────────────────────────────────────
  for (const t of [t1, t2, t3, t4, t5, t6, t7, t8]) {
    await prisma.pricing.create({
      data: {
        treatmentId: t.id,
        singleSessionPrice: t.pricePerSession,
        package5Price: +(t.pricePerSession * 5 * 0.9).toFixed(0),
        package10Price: +(t.pricePerSession * 10 * 0.8).toFixed(0),
      },
    })
  }

  console.log('✅ Pricing created')

  // ── Machines ───────────────────────────────────────────────────────────────
  const m1 = await prisma.machine.create({
    data: {
      name: 'Ultrasound Therapy Unit',
      brand: 'Chattanooga',
      model: 'Intelect Mobile 2',
      description: 'Advanced therapeutic ultrasound for deep tissue healing.',
      specialty: 'Ortho',
      certifications: JSON.stringify(['CE Certified', 'FDA Approved']),
      acquiredDate: new Date('2022-01-15'),
    },
  })

  const m2 = await prisma.machine.create({
    data: {
      name: 'TENS / IFT Machine',
      brand: 'Electrotherapy India',
      model: 'ET-4000',
      description: 'Dual-channel interferential and TENS therapy unit for pain management.',
      specialty: 'Ortho',
      certifications: JSON.stringify(['ISO 13485', 'CE Certified']),
      acquiredDate: new Date('2021-06-20'),
    },
  })

  const m3 = await prisma.machine.create({
    data: {
      name: 'Gait Training Treadmill',
      brand: 'h/p/cosmos',
      model: 'Mercury',
      description: 'Medical treadmill with body-weight support for neurological gait rehab.',
      specialty: 'Neuro',
      certifications: JSON.stringify(['Medical CE', 'TÜV Certified']),
      acquiredDate: new Date('2022-08-05'),
    },
  })

  const m4 = await prisma.machine.create({
    data: {
      name: 'Shockwave Therapy Machine',
      brand: 'Storz Medical',
      model: 'Masterpuls MP50',
      description: 'Radial shockwave therapy for chronic tendinopathies and calcifications.',
      specialty: 'Sports',
      certifications: JSON.stringify(['CE Certified', 'ISO 13485']),
      acquiredDate: new Date('2023-05-12'),
    },
  })

  const m5 = await prisma.machine.create({
    data: {
      name: 'Laser Therapy Device',
      brand: 'Erchonia',
      model: 'FX 635',
      description: 'Low-level laser therapy for tissue repair and pain relief.',
      specialty: 'Sports',
      certifications: JSON.stringify(['FDA Cleared', 'Class II Medical Device']),
      acquiredDate: new Date('2023-02-28'),
    },
  })

  console.log('✅ Machines created')

  // ── Link Treatments ↔ Machines ─────────────────────────────────────────────
  await prisma.treatmentMachine.createMany({
    data: [
      { treatmentId: t1.id, machineId: m2.id, usageOrder: 1 }, // Manual + TENS
      { treatmentId: t2.id, machineId: m2.id, usageOrder: 1 }, // Electro + TENS
      { treatmentId: t3.id, machineId: m1.id, usageOrder: 1 }, // Ultrasound + US unit
      { treatmentId: t4.id, machineId: m3.id, usageOrder: 1 }, // Stroke + treadmill
      { treatmentId: t6.id, machineId: m4.id, usageOrder: 1 }, // Sports + shockwave
      { treatmentId: t7.id, machineId: m4.id, usageOrder: 1 }, // ACL + shockwave
      { treatmentId: t7.id, machineId: m5.id, usageOrder: 2 }, // ACL + laser
    ],
  })

  console.log('✅ Treatment-machine links created')

  // ── Sample appointment ─────────────────────────────────────────────────────
  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      therapistId: therapist.id,
      treatmentId: t7.id,
      appointmentDate: new Date('2026-07-15'),
      appointmentTime: '10:00',
      status: 'CONFIRMED',
      notes: 'Post-surgery ACL rehab session 3',
    },
  })

  console.log('✅ Sample appointment created')

  // ── Patient Stories ────────────────────────────────────────────────────────
  await prisma.patientStory.createMany({
    data: [
      {
        patientId: patient1.id,
        title: 'Back on the Football Field',
        storyText: "After tearing my ACL during a football match, I was told I'd never play again. The team at ONS Healthcare proved everyone wrong. After 8 weeks of dedicated physiotherapy, I was back on the field stronger than ever. The progressive exercise plan and constant encouragement from my therapist made all the difference.",
        condition: 'ACL Tear',
        specialty: 'Sports',
        rating: 5,
        status: 'PUBLISHED',
        featured: true,
        publishedAt: new Date('2024-03-15'),
      },
      {
        patientId: patient2.id,
        title: 'Free from Neck Pain',
        storyText: 'I suffered from chronic neck pain for over 3 years affecting my work and sleep. After trying multiple treatments elsewhere, ONS Healthcare gave me a personalised plan combining manual therapy, traction and posture correction. I was pain-free in just 6 weeks. Highly recommended!',
        condition: 'Cervical Spondylosis',
        specialty: 'Ortho',
        rating: 5,
        status: 'PUBLISHED',
        featured: true,
        publishedAt: new Date('2024-02-20'),
      },
    ],
  })

  console.log('✅ Patient stories created')
  console.log('\n🎉 Database seeded successfully!')
  console.log('\n📋 Login credentials:')
  console.log('   Admin  → admin@onshealthcare.in  / admin123')
  console.log('   Patient → patient1@example.com   / password123')
  console.log('   Patient → patient2@example.com   / password123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
