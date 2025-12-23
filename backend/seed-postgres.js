const sequelize = require('./config/database');
const Pet = require('./models/Pet');
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Vaccine = require('./models/Vaccine');
const Appointment = require('./models/Appointment');
const Sale = require('./models/Sale');
const MedicalRecord = require('./models/MedicalRecord');
const Invoice = require('./models/Invoice');

const seedData = async () => {
  try {
    console.log('Connecting to PostgreSQL...');
    await sequelize.authenticate();
    console.log('Connection established.');

    // Clear existing data
    console.log('Clearing existing data...');
    await Pet.destroy({ where: {}, truncate: true, cascade: true });
    await Customer.destroy({ where: {}, truncate: true, cascade: true });
    await Product.destroy({ where: {}, truncate: true, cascade: true });
    await Vaccine.destroy({ where: {}, truncate: true, cascade: true });
    await Appointment.destroy({ where: {}, truncate: true, cascade: true });
    await Sale.destroy({ where: {}, truncate: true, cascade: true });
    await MedicalRecord.destroy({ where: {}, truncate: true, cascade: true });
    await Invoice.destroy({ where: {}, truncate: true, cascade: true });

    // Seed pets
    console.log('Seeding pets...');
    const pets = await Pet.bulkCreate([
      {
        name: 'Mèo Mimi',
        type: 'Mèo',
        age: 2,
        ownerName: 'Nguyễn Văn A',
        ownerPhone: '0123-456-789',
        ownerEmail: 'nguyenvana@email.com'
      },
      {
        name: 'Chó Max',
        type: 'Chó',
        age: 3,
        ownerName: 'Trần Thị B',
        ownerPhone: '0987-654-321',
        ownerEmail: 'tranthib@email.com'
      },
      {
        name: 'Chim Kiwi',
        type: 'Chim',
        age: 1,
        ownerName: 'Lê Văn C',
        ownerPhone: '0456-789-123',
        ownerEmail: 'levanc@email.com'
      }
    ]);

    // Seed customers
    console.log('Seeding customers...');
    await Customer.bulkCreate([
      {
        name: 'Nguyễn Văn A',
        phone: '0123-456-789',
        email: 'nguyenvana@email.com',
        address: '123 Đường ABC, Quận 1, TP.HCM'
      },
      {
        name: 'Trần Thị B',
        phone: '0987-654-321',
        email: 'tranthib@email.com',
        address: '456 Đường XYZ, Quận 2, TP.HCM'
      }
    ]);

    // Seed products
    console.log('Seeding products...');
    await Product.bulkCreate([
      {
        name: 'Thức ăn cho chó',
        category: 'food',
        price: 150000,
        stock: 50,
        description: 'Thức ăn dinh dưỡng cho chó'
      },
      {
        name: 'Thức ăn cho mèo',
        category: 'food',
        price: 140000,
        stock: 45,
        description: 'Thức ăn dinh dưỡng cho mèo'
      },
      {
        name: 'Đồ chơi cho thú cưng',
        category: 'toy',
        price: 50000,
        stock: 30,
        description: 'Đồ chơi vui nhộn cho thú cưng'
      },
      {
        name: 'Nệm cho thú cưng',
        category: 'bed',
        price: 200000,
        stock: 20,
        description: 'Nệm êm ái cho thú cưng'
      }
    ]);

    // Seed vaccines
    console.log('Seeding vaccines...');
    await Vaccine.bulkCreate([
      {
        name: 'Vaccine dại',
        type: 'Bắt buộc',
        price: 100000,
        stock: 50,
        description: 'Vaccine phòng bệnh dại',
        dosage: '1ml',
        schedule: 'Hàng năm'
      },
      {
        name: 'Vaccine tổng hợp',
        type: 'Khuyến nghị',
        price: 150000,
        stock: 30,
        description: 'Vaccine phòng nhiều bệnh',
        dosage: '1ml',
        schedule: 'Hàng năm'
      },
      {
        name: 'Vaccine ký sinh trùng',
        type: 'Phòng ngừa',
        price: 80000,
        stock: 40,
        description: 'Vaccine phòng ve, bọ chét',
        dosage: '0.5ml',
        schedule: 'Hàng quý'
      }
    ]);

    // Seed appointments
    console.log('Seeding appointments...');
    await Appointment.bulkCreate([
      {
        petName: 'Mèo Mimi',
        ownerName: 'Nguyễn Văn A',
        phone: '0123-456-789',
        service: 'grooming',
        date: new Date('2024-12-25'),
        time: '10:00',
        notes: 'Cần tắm và cắt lông',
        status: 'pending'
      },
      {
        petName: 'Chó Max',
        ownerName: 'Trần Thị B',
        phone: '0987-654-321',
        service: 'vet',
        date: new Date('2024-12-26'),
        time: '14:00',
        notes: 'Khám sức khỏe định kỳ',
        status: 'confirmed'
      }
    ]);

    // Seed medical records
    console.log('Seeding medical records...');
    await MedicalRecord.bulkCreate([
      {
        petName: 'Chó Max',
        ownerName: 'Trần Thị B',
        symptoms: 'Ho, chảy nước mũi',
        diagnosis: 'Cảm cúm nhẹ',
        treatment: 'Thuốc kháng sinh và nghỉ ngơi',
        medications: 'Amoxicillin 500mg',
        notes: 'Theo dõi trong 3 ngày',
        veterinarian: 'Dr. PetCarx'
      }
    ]);

    // Seed sales
    console.log('Seeding sales...');
    await Sale.bulkCreate([
      {
        customerName: 'Nguyễn Văn A',
        phone: '0123-456-789',
        productName: 'Thức ăn cho mèo',
        quantity: 2,
        unitPrice: 140000,
        total: 280000,
        date: new Date()
      }
    ]);

    // Seed invoices
    console.log('Seeding invoices...');
    await Invoice.bulkCreate([
      {
        invoiceNumber: 'INV-001',
        customerName: 'Trần Thị B',
        phone: '0987-654-321',
        date: new Date(),
        items: [
          {
            description: 'Khám sức khỏe',
            quantity: 1,
            unitPrice: 200000,
            total: 200000
          }
        ],
        subtotal: 200000,
        tax: 0,
        total: 200000,
        status: 'paid'
      }
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
