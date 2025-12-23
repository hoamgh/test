import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SalesForm() {
  const navigate = useNavigate()
  const [saleData, setSaleData] = useState({
    customerName: '',
    phone: '',
    product: '',
    quantity: 1,
    unitPrice: 0,
    total: 0
  })

  const products = [
    { id: 'food', name: 'Thức ăn cho chó', price: 150000, stock: 50 },
    { id: 'food_cat', name: 'Thức ăn cho mèo', price: 140000, stock: 45 },
    { id: 'toy', name: 'Đồ chơi', price: 50000, stock: 30 },
    { id: 'bed', name: 'Nệm cho thú cưng', price: 200000, stock: 20 },
    { id: 'shampoo', name: 'Dầu gội', price: 80000, stock: 25 },
    { id: 'collar', name: 'Vòng cổ', price: 30000, stock: 40 }
  ]

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProduct = products.find(p => p.id === e.target.value)
    if (selectedProduct) {
      setSaleData({
        ...saleData,
        product: e.target.value,
        unitPrice: selectedProduct.price,
        total: selectedProduct.price * saleData.quantity
      })
    }
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(e.target.value) || 1
    setSaleData({
      ...saleData,
      quantity,
      total: saleData.unitPrice * quantity
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaleData({
      ...saleData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: saleData.customerName,
          phone: saleData.phone,
          productName: saleData.product,
          quantity: saleData.quantity,
          unitPrice: saleData.unitPrice,
          total: saleData.total
        })
      });

      if (response.ok) {
        alert('Bán hàng thành công! Đã cập nhật tồn kho.');
        navigate('/');
      } else {
        alert('Có lỗi xảy ra khi bán hàng!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Không thể kết nối đến server!');
    }
  }

  const selectedProduct = products.find(p => p.id === saleData.product)

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-20"
      >
        ← Quay lại
      </button>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-200 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-rose-200 rounded-full opacity-25 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8 pt-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-purple-800 mb-4 drop-shadow-lg">
            🛒 Bán hàng
          </h1>
          <p className="text-xl text-gray-700 text-center mb-12">
            Quản lý bán hàng và cập nhật tồn kho
          </p>

          <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-200">
            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">👤 Thông tin khách hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tên khách hàng</label>
                  <input
                    type="text"
                    name="customerName"
                    value={saleData.customerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={saleData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Product Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-purple-800 mb-4">📦 Chọn sản phẩm</h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Sản phẩm</label>
                <select
                  value={saleData.product}
                  onChange={handleProductChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">Chọn sản phẩm</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.price.toLocaleString()} VND (Còn: {product.stock})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-purple-800 mb-2">Thông tin sản phẩm</h3>
                  <p className="text-gray-600">Tồn kho: {selectedProduct.stock} sản phẩm</p>
                  <p className="text-gray-600">Giá: {selectedProduct.price.toLocaleString()} VND</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Số lượng</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedProduct?.stock || 1}
                    value={saleData.quantity}
                    onChange={handleQuantityChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Thành tiền</label>
                  <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg font-semibold text-lg">
                    {saleData.total.toLocaleString()} VND
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-colors font-semibold"
            >
              💰 Xác nhận bán hàng
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default SalesForm