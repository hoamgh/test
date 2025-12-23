import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchForm() {
  const navigate = useNavigate()
  const [searchType, setSearchType] = useState('pets')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Mock data - in a real app, this would come from your backend
  const mockData = {
    pets: [
      { id: 1, name: 'Mèo Mimi', type: 'Mèo', age: 2, owner: 'Nguyễn Văn A', phone: '0123-456-789' },
      { id: 2, name: 'Chó Max', type: 'Chó', age: 3, owner: 'Trần Thị B', phone: '0987-654-321' },
      { id: 3, name: 'Chim Kiwi', type: 'Chim', age: 1, owner: 'Lê Văn C', phone: '0456-789-123' },
      { id: 4, name: 'Thỏ Bunny', type: 'Thỏ', age: 1, owner: 'Phạm Thị D', phone: '0789-123-456' }
    ],
    vaccines: [
      { id: 1, name: 'Vaccine dại', type: 'Bắt buộc', price: 100000, stock: 50 },
      { id: 2, name: 'Vaccine tổng hợp', type: 'Khuyến nghị', price: 150000, stock: 30 },
      { id: 3, name: 'Vaccine ký sinh trùng', type: 'Phòng ngừa', price: 80000, stock: 40 }
    ],
    customers: [
      { id: 1, name: 'Nguyễn Văn A', phone: '0123-456-789', email: 'nguyenvana@email.com', pets: 2 },
      { id: 2, name: 'Trần Thị B', phone: '0987-654-321', email: 'tranthib@email.com', pets: 1 },
      { id: 3, name: 'Lê Văn C', phone: '0456-789-123', email: 'levanc@email.com', pets: 3 },
      { id: 4, name: 'Phạm Thị D', phone: '0789-123-456', email: 'phamthid@email.com', pets: 1 }
    ]
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/search?type=${searchType}&query=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const results = await response.json()
        setSearchResults(results)
      } else {
        setSearchResults([])
        alert('Có lỗi xảy ra khi tìm kiếm!')
      }
    } catch (error) {
      console.error('Error:', error)
      setSearchResults([])
      alert('Không thể kết nối đến server!')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-50 to-amber-100 relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-20"
      >
        ← Quay lại
      </button>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-200 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-amber-200 rounded-full opacity-25 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-orange-800 mb-4 drop-shadow-lg">
            🔍 Tìm kiếm
          </h1>
          <p className="text-xl text-gray-700 text-center mb-12">
            Tìm kiếm thông tin thú cưng, vaccine và khách hàng
          </p>

          {/* Search Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-200 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Loại tìm kiếm</label>
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="pets">Thú cưng</option>
                  <option value="vaccines">Vaccine</option>
                  <option value="customers">Khách hàng</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Từ khóa tìm kiếm</label>
                <div className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Tìm kiếm ${searchType === 'pets' ? 'thú cưng' : searchType === 'vaccines' ? 'vaccine' : 'khách hàng'}...`}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-r-lg transition-colors font-semibold"
                  >
                    🔍 Tìm
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Search Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              <p className="mt-4 text-lg text-gray-600">Đang tìm kiếm...</p>
            </div>
          ) : searchResults.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-200">
              <h2 className="text-2xl font-bold text-orange-800 mb-6">
                📋 Kết quả tìm kiếm ({searchResults.length})
              </h2>

              {searchType === 'pets' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((pet: any) => (
                    <div key={pet.id} className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                      <h3 className="font-bold text-orange-800 text-lg mb-2">{pet.name}</h3>
                      <p className="text-gray-600 mb-1"><strong>Loại:</strong> {pet.type}</p>
                      <p className="text-gray-600 mb-1"><strong>Tuổi:</strong> {pet.age} tuổi</p>
                      <p className="text-gray-600 mb-1"><strong>Chủ nuôi:</strong> {pet.owner}</p>
                      <p className="text-gray-600"><strong>SĐT:</strong> {pet.phone}</p>
                    </div>
                  ))}
                </div>
              )}

              {searchType === 'vaccines' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {searchResults.map((vaccine: any) => (
                    <div key={vaccine.id} className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                      <h3 className="font-bold text-orange-800 text-lg mb-2">{vaccine.name}</h3>
                      <p className="text-gray-600 mb-1"><strong>Loại:</strong> {vaccine.type}</p>
                      <p className="text-gray-600 mb-1"><strong>Giá:</strong> {vaccine.price.toLocaleString()} VND</p>
                      <p className="text-gray-600"><strong>Tồn kho:</strong> {vaccine.stock} lọ</p>
                    </div>
                  ))}
                </div>
              )}

              {searchType === 'customers' && (
                <div className="grid grid-cols-1 gap-6">
                  {searchResults.map((customer: any) => (
                    <div key={customer.id} className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                      <h3 className="font-bold text-orange-800 text-lg mb-2">{customer.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <p className="text-gray-600"><strong>SĐT:</strong> {customer.phone}</p>
                        <p className="text-gray-600"><strong>Email:</strong> {customer.email}</p>
                        <p className="text-gray-600"><strong>Số thú cưng:</strong> {customer.pets}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-orange-200 text-center">
              <div className="text-6xl mb-4">😔</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-gray-600">Hãy thử từ khóa khác hoặc kiểm tra chính tả</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default SearchForm