'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ReportEditorProps {
  reportId: string
  onClose: () => void
}

export default function ReportEditor({ reportId, onClose }: ReportEditorProps) {
  const [report, setReport] = useState({
    customerName: '',
    season: '',
    confidence: 85,
    undertone: '',
    bestColors: ['#8B4513', '#CD853F', '#D2691E', '#A0522D', '#DEB887'],
    avoidColors: ['#FF69B4', '#00FFFF', '#FFFF00'],
    makeupTips: '',
    wardrobeTips: '',
    shoppingGuide: '',
    personalMessage: ''
  })

  useEffect(() => {
    loadReport()
  }, [reportId])

  const loadReport = async () => {
    // Load existing report data
    const response = await fetch(`/api/reports/${reportId}`)
    const data = await response.json()
    if (data.success) {
      setReport(data.report)
    }
  }

  const saveReport = async () => {
    const response = await fetch(`/api/reports/${reportId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    })
    
    if (response.ok) {
      alert('Report saved successfully!')
    }
  }

  const sendReport = async () => {
    const response = await fetch(`/api/reports/${reportId}/send`, {
      method: 'POST'
    })
    
    if (response.ok) {
      alert('Report sent to customer!')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Color Analysis Report Editor</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Customer Name</label>
              <Input
                value={report.customerName}
                onChange={(e) => setReport({...report, customerName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Color Season</label>
              <select
                value={report.season}
                onChange={(e) => setReport({...report, season: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>
            </div>
          </div>

          {/* Color Palette Section */}
          <div>
            <label className="block text-sm font-medium mb-2">Best Colors (Hex Codes)</label>
            <div className="grid grid-cols-5 gap-2">
              {report.bestColors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: color }}
                  ></div>
                  <Input
                    value={color}
                    onChange={(e) => {
                      const newColors = [...report.bestColors]
                      newColors[index] = e.target.value
                      setReport({...report, bestColors: newColors})
                    }}
                    className="text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Avoid Colors */}
          <div>
            <label className="block text-sm font-medium mb-2">Colors to Avoid</label>
            <div className="grid grid-cols-3 gap-2">
              {report.avoidColors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: color }}
                  ></div>
                  <Input
                    value={color}
                    onChange={(e) => {
                      const newColors = [...report.avoidColors]
                      newColors[index] = e.target.value
                      setReport({...report, avoidColors: newColors})
                    }}
                    className="text-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Sections */}
          <div>
            <label className="block text-sm font-medium mb-2">Makeup Tips</label>
            <Textarea
              value={report.makeupTips}
              onChange={(e) => setReport({...report, makeupTips: e.target.value})}
              rows={3}
              placeholder="Foundation, lipstick, eyeshadow recommendations..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Wardrobe Tips</label>
            <Textarea
              value={report.wardrobeTips}
              onChange={(e) => setReport({...report, wardrobeTips: e.target.value})}
              rows={3}
              placeholder="Clothing colors, patterns, styling advice..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Shopping Guide</label>
            <Textarea
              value={report.shoppingGuide}
              onChange={(e) => setReport({...report, shoppingGuide: e.target.value})}
              rows={3}
              placeholder="Where to shop, specific items to look for..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Personal Message</label>
            <Textarea
              value={report.personalMessage}
              onChange={(e) => setReport({...report, personalMessage: e.target.value})}
              rows={2}
              placeholder="Personal note from the analyst..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="space-x-2">
            <Button onClick={saveReport}>
              Save Draft
            </Button>
            <Button onClick={sendReport} className="bg-green-600 hover:bg-green-700">
              Send to Customer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}