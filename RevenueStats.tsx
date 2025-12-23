import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function RevenueStats() {
  const navigate = useNavigate()

  const [stats, setStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    dailyRevenue: 0,
    topServices: [],
    monthlyData: []
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/stats/revenue')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        } else {
          console.error('Failed to fetch stats')
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-20"
      >
        ← Quay lại
      </button>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-green-200 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-teal-200 rounded-full opacity-25 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8 pt-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-emerald-800 mb-4 drop-shadow-lg">
            📊 Thống kê doanh thu
          </h1>
          <p className="text-xl text-gray-700 text-center mb-12">
            Báo cáo tổng quan về doanh thu và hiệu suất kinh doanh
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-200 text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">Tổng doanh thu</h3>
                  <p className="text-3xl font-bold text-emerald-600">{stats.totalRevenue.toLocaleString()} VND</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-200 text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">Doanh thu tháng</h3>
                  <p className="text-3xl font-bold text-emerald-600">{stats.monthlyRevenue.toLocaleString()} VND</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-200 text-center">
                  <div className="text-4xl mb-2">📅</div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">Doanh thu ngày</h3>
                  <p className="text-3xl font-bold text-emerald-600">{stats.dailyRevenue.toLocaleString()} VND</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Top Services */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200">
                  <h2 className="text-3xl font-bold mb-6 text-emerald-800 flex items-center">
                    <span className="mr-3">🏆</span> Dịch vụ bán chạy
                  </h2>
                  <div className="space-y-4">
                    {stats.topServices.map((service, index) => (
                      <div key={index} className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold text-emerald-800">{service.name}</h3>
                          <span className="text-sm bg-emerald-200 text-emerald-800 px-2 py-1 rounded">
                            {service.count} lượt
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-emerald-600">{service.revenue.toLocaleString()} VND</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Revenue Chart */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200">
                  <h2 className="text-3xl font-bold mb-6 text-emerald-800 flex items-center">
                    <span className="mr-3">📊</span> Doanh thu theo tháng
                  </h2>
                  <div className="space-y-4">
                    {stats.monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-24 text-gray-600 font-medium">{data.month}</div>
                        <div className="flex-1 mx-4">
                          <div className="bg-emerald-200 rounded-full h-6 relative">
                            <div
                              className="bg-emerald-500 h-6 rounded-full transition-all duration-500"
                              style={{
                                width: `${(data.revenue / Math.max(...stats.monthlyData.map(d => d.revenue))) * 100}%`
                              }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-32 text-right font-semibold text-emerald-600">
                          {data.revenue.toLocaleString()} VND
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-emerald-200">
                <h2 className="text-3xl font-bold mb-6 text-emerald-800 flex items-center">
                  <span className="mr-3">📈</span> Thống kê chi tiết
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🐕</div>
                    <h3 className="font-semibold text-gray-700">Tổng thú cưng</h3>
                    <p className="text-2xl font-bold text-emerald-600">450</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">👥</div>
                    <h3 className="font-semibold text-gray-700">Khách hàng</h3>
                    <p className="text-2xl font-bold text-emerald-600">320</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">📅</div>
                    <h3 className="font-semibold text-gray-700">Lịch hẹn tháng</h3>
                    <p className="text-2xl font-bold text-emerald-600">180</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⭐</div>
                    <h3 className="font-semibold text-gray-700">Đánh giá trung bình</h3>
                    <p className="text-2xl font-bold text-emerald-600">4.8/5</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default RevenueStats