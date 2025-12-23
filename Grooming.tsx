import { Card } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

function Grooming() {
  const navigate = useNavigate()

  return (
    <main className="container mx-auto px-4 py-8 pt-16 relative">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-10"
      >
        ← Quay lại
      </button>

      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5 rounded-lg"
        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200)'}}
      ></div>
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-800">Dịch vụ Grooming</h1>
        <p className="text-center text-gray-700 mb-12 text-lg">
          Cắt tỉa, tắm rửa và chăm sóc ngoại hình chuyên nghiệp cho thú cưng của bạn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-blue-50 border-blue-200 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Dịch vụ bao gồm</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>✂️ Cắt tỉa lông chuyên nghiệp</li>
              <li>🛁 Tắm rửa và sấy khô</li>
              <li>💅 Cắt móng và làm sạch tai</li>
              <li>🧼 Chải lông và massage</li>
              <li>🌸 Dưỡng lông và da</li>
            </ul>
          </Card>

          <Card className="bg-green-50 border-green-200 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-900">Giá cả và ưu đãi</h2>
            <div className="space-y-3">
              <p className="text-gray-700"><strong>Chó nhỏ:</strong> 200.000 VND</p>
              <p className="text-gray-700"><strong>Chó lớn:</strong> 350.000 VND</p>
              <p className="text-gray-700"><strong>Mèo:</strong> 250.000 VND</p>
              <p className="text-green-600 font-semibold mt-4">🎁 Ưu đãi: Giảm 10% cho lần đầu!</p>
            </div>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Tại sao chọn PetCarx?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-purple-50 border-purple-200 shadow-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-2">Chuyên nghiệp</h3>
              <p className="text-gray-700">Đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo chuyên nghiệp.</p>
            </Card>
            <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
              <h3 className="text-xl font-bold text-yellow-900 mb-2">An toàn</h3>
              <p className="text-gray-700">Sử dụng sản phẩm organic, thân thiện với thú cưng.</p>
            </Card>
            <Card className="bg-pink-50 border-pink-200 shadow-lg">
              <h3 className="text-xl font-bold text-pink-900 mb-2">Yên tâm</h3>
              <p className="text-gray-700">Môi trường thoải mái, thú cưng được chăm sóc tận tình.</p>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg transition-colors">
            📞 Đặt lịch ngay
          </button>
          <p className="text-gray-600 mt-4">Hotline: (028) 1234-5678</p>
        </div>
      </div>
    </main>
  )
}

export default Grooming