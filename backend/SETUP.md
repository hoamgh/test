# Hướng dẫn chạy Backend PetCarx với PostgreSQL (Neon)

## Bước 1: Tạo database trên Neon
1. Đăng ký tài khoản tại https://neon.tech/
2. Tạo một project mới
3. Copy DATABASE_URL từ dashboard

## Bước 2: Cài đặt dependencies
```bash
cd backend
npm install
```

## Bước 3: Cấu hình environment
Tạo file `.env` trong thư mục backend:
```env
DATABASE_URL=postgresql://neondb_owner:npg_VLtCB7Ne6cir@ep-calm-glade-a1f892io-pooler.ap-southeast-1.aws.neon.tech/PetCareX
FRONTEND_URL=http://localhost:3000
BACKEND_PORT=8000
```

## Bước 4: Khởi tạo database (tạo tables)
```bash
node migrations/init-database.js
```

## Bước 5: Seed dữ liệu mẫu
```bash
node seed-postgres.js
```

## Bước 6: Chạy server
```bash
npm run dev
```

Backend sẽ chạy trên http://localhost:8000

## API Endpoints chính:
- `/api/appointments` - Quản lý lịch hẹn
- `/api/medical-records` - Hồ sơ y tế
- `/api/sales` - Bán hàng (tự động cập nhật tồn kho)
- `/api/invoices` - Hóa đơn
- `/api/stats` - Thống kê doanh thu
- `/api/search` - Tìm kiếm
- `/api/pets` - Quản lý thú cưng
- `/api/customers` - Quản lý khách hàng
- `/api/vaccines` - Quản lý vaccine

## Frontend Integration
Frontend đã được cập nhật để gọi API từ port 8000. Ví dụ trong AppointmentForm:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:8000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      alert('Đặt lịch thành công!');
      navigate('/');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

## Lưu ý:
- Database sử dụng PostgreSQL trên Neon với SSL
- Tất cả models sử dụng UUID làm primary key
- Timestamps (createdAt, updatedAt) được tự động quản lý bởi Sequelize
- CORS đã được cấu hình để cho phép frontend:3000 kết nối backend:8000