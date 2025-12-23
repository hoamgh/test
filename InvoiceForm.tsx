import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function InvoiceForm() {
  const navigate = useNavigate()
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now()}`,
    customerName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    items: [
      { description: '', quantity: 1, unitPrice: 0, total: 0 }
    ],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: ''
  })

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    })
  }

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = invoiceData.items.map((item, i) => {
      if (i === index) {
        const updatedItem = { ...item, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
        }
        return updatedItem
      }
      return item
    })

    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
      subtotal,
      tax,
      total
    })
  }

  const removeItem = (index: number) => {
    if (invoiceData.items.length > 1) {
      const updatedItems = invoiceData.items.filter((_, i) => i !== index)
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const tax = subtotal * 0.1
      const total = subtotal + tax

      setInvoiceData({
        ...invoiceData,
        items: updatedItems,
        subtotal,
        tax,
        total
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: invoiceData.customerName,
          phone: invoiceData.phone,
          service: invoiceData.service,
          amount: invoiceData.amount,
          dueDate: invoiceData.dueDate,
          status: invoiceData.status
        })
      });

      if (response.ok) {
        alert('Hóa đơn đã được tạo thành công!');
        navigate('/');
      } else {
        alert('Có lỗi xảy ra khi tạo hóa đơn!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Không thể kết nối đến server!');
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 relative overflow-hidden">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-20"
      >
        ← Quay lại
      </button>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-200 rounded-full opacity-15 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-200 rounded-full opacity-25 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8 pt-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-center text-indigo-800 mb-4 drop-shadow-lg">
            📄 Tạo hóa đơn
          </h1>
          <p className="text-xl text-gray-700 text-center mb-12">
            Tạo hóa đơn cho dịch vụ và sản phẩm
          </p>

          <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-indigo-200">
            {/* Invoice Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">📋 Thông tin hóa đơn</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Số hóa đơn</label>
                  <input
                    type="text"
                    value={invoiceData.invoiceNumber}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tên khách hàng</label>
                  <input
                    type="text"
                    name="customerName"
                    value={invoiceData.customerName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Ngày</label>
                  <input
                    type="date"
                    name="date"
                    value={invoiceData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-gray-700 font-semibold mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={invoiceData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Invoice Items */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-indigo-800">🛍️ Chi tiết sản phẩm/dịch vụ</h2>
                <button
                  type="button"
                  onClick={addItem}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  + Thêm mục
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">Mô tả</th>
                      <th className="border border-gray-300 px-4 py-2 text-center w-24">SL</th>
                      <th className="border border-gray-300 px-4 py-2 text-right w-32">Đơn giá</th>
                      <th className="border border-gray-300 px-4 py-2 text-right w-32">Thành tiền</th>
                      <th className="border border-gray-300 px-4 py-2 text-center w-20">Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => updateItem(index, 'description', e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500"
                            placeholder="Tên sản phẩm/dịch vụ"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-center focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="number"
                            min="0"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(index, 'unitPrice', parseInt(e.target.value) || 0)}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-right focus:ring-1 focus:ring-indigo-500"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                          {item.total.toLocaleString()} VND
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700"
                            disabled={invoiceData.items.length === 1}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">💰 Tóm tắt</h2>
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Tổng tiền hàng:</span>
                  <span>{invoiceData.subtotal.toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Thuế (10%):</span>
                  <span>{invoiceData.tax.toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-gray-300 pt-2">
                  <span>Tổng cộng:</span>
                  <span className="text-indigo-600">{invoiceData.total.toLocaleString()} VND</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">Ghi chú</label>
              <textarea
                name="notes"
                value={invoiceData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Ghi chú cho hóa đơn..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-colors font-semibold"
            >
              📄 Tạo hóa đơn
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default InvoiceForm