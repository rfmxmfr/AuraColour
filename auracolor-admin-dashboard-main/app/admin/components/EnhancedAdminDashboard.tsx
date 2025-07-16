'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import './enhanced-admin.css'

interface MLAnalysis {
  id: string
  clientId: string
  confidence: number
  season: string
  colors: string[]
  status: 'processing' | 'completed' | 'failed'
}

interface ContentItem {
  id: string
  type: 'service' | 'faq' | 'blog'
  title: string
  content: string
  status: 'draft' | 'published'
  lastModified: string
}

export default function EnhancedAdminDashboard() {
  const [currentSection, setCurrentSection] = useState('ml-analytics')
  const [mlAnalyses, setMlAnalyses] = useState<MLAnalysis[]>([])
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAnalysis, setSelectedAnalysis] = useState<MLAnalysis | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null)

  useEffect(() => {
    loadEnhancedData()
  }, [])

  const loadEnhancedData = async () => {
    try {
      // Mock ML analyses data
      const mockMLAnalyses: MLAnalysis[] = [
        {
          id: '1',
          clientId: 'client_001',
          confidence: 0.92,
          season: 'Deep Winter',
          colors: ['#000080', '#8B0000', '#4B0082', '#006400'],
          status: 'completed'
        },
        {
          id: '2',
          clientId: 'client_002',
          confidence: 0.87,
          season: 'Bright Spring',
          colors: ['#FF6347', '#32CD32', '#FF1493', '#00CED1'],
          status: 'completed'
        },
        {
          id: '3',
          clientId: 'client_003',
          confidence: 0.78,
          season: 'Soft Summer',
          colors: ['#B0C4DE', '#DDA0DD', '#F0E68C', '#98FB98'],
          status: 'processing'
        }
      ]

      const mockContent: ContentItem[] = [
        {
          id: '1',
          type: 'service',
          title: '12-Season Color Analysis',
          content: 'Professional color analysis service...',
          status: 'published',
          lastModified: new Date().toISOString()
        },
        {
          id: '2',
          type: 'faq',
          title: 'What is color analysis?',
          content: 'Color analysis is a process...',
          status: 'published',
          lastModified: new Date().toISOString()
        }
      ]

      setMlAnalyses(mockMLAnalyses)
      setContentItems(mockContent)
    } catch (error) {
      console.error('Failed to load enhanced data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePDFReport = async (analysisId: string) => {
    try {
      const response = await fetch(`/api/reports/${analysisId}/pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `color-analysis-${analysisId}.pdf`
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate PDF report')
    }
  }

  const runMLAnalysis = async (clientId: string) => {
    try {
      const response = await fetch('/api/ml-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId })
      })
      
      if (response.ok) {
        const newAnalysis = await response.json()
        setMlAnalyses(prev => [...prev, newAnalysis])
        alert('ML analysis started successfully')
      }
    } catch (error) {
      console.error('ML analysis failed:', error)
      alert('Failed to start ML analysis')
    }
  }

  const saveContent = async (content: ContentItem) => {
    try {
      const response = await fetch('/api/content', {
        method: content.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      
      if (response.ok) {
        const savedContent = await response.json()
        if (content.id) {
          setContentItems(prev => prev.map(item => 
            item.id === content.id ? savedContent : item
          ))
        } else {
          setContentItems(prev => [...prev, savedContent])
        }
        setShowModal(false)
        setEditingContent(null)
      }
    } catch (error) {
      console.error('Content save failed:', error)
      alert('Failed to save content')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="enhanced-admin-layout">
      {/* Sidebar */}
      <nav className="enhanced-sidebar">
        <div className="sidebar-header">
          <h2>🧠 Enhanced Admin</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={`menu-item ${currentSection === 'ml-analytics' ? 'active' : ''}`}
              onClick={() => setCurrentSection('ml-analytics')}
            >
              🤖 ML Analytics
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'pdf-reports' ? 'active' : ''}`}
              onClick={() => setCurrentSection('pdf-reports')}
            >
              📄 PDF Reports
            </button>
          </li>
          <li>
            <button 
              className={`menu-item ${currentSection === 'content-management' ? 'active' : ''}`}
              onClick={() => setCurrentSection('content-management')}
            >
              📝 Content Management
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="enhanced-main">
        <header className="enhanced-header">
          <h1>{getSectionTitle(currentSection)}</h1>
        </header>

        {/* ML Analytics Section */}
        {currentSection === 'ml-analytics' && (
          <section className="ml-section">
            <div className="section-header">
              <h2>TensorFlow ML Analysis</h2>
              <button 
                className="action-btn"
                onClick={() => runMLAnalysis('new_client')}
              >
                🚀 Run New Analysis
              </button>
            </div>
            
            <div className="ml-grid">
              {mlAnalyses.map(analysis => (
                <div key={analysis.id} className="ml-card">
                  <div className="ml-header">
                    <h4>Client {analysis.clientId}</h4>
                    <span className={`status-badge ${analysis.status}`}>
                      {analysis.status}
                    </span>
                  </div>
                  
                  <div className="ml-content">
                    <div className="confidence-meter">
                      <label>Confidence: {Math.round(analysis.confidence * 100)}%</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${analysis.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="season-result">
                      <strong>Season: {analysis.season}</strong>
                    </div>
                    
                    <div className="color-palette">
                      {analysis.colors.map((color, idx) => (
                        <div 
                          key={idx}
                          className="color-swatch"
                          style={{ backgroundColor: color }}
                          title={color}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ml-actions">
                    <button 
                      className="view-btn"
                      onClick={() => {
                        setSelectedAnalysis(analysis)
                        setShowModal(true)
                      }}
                    >
                      View Details
                    </button>
                    <button 
                      className="pdf-btn"
                      onClick={() => generatePDFReport(analysis.id)}
                    >
                      📄 Generate PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PDF Reports Section */}
        {currentSection === 'pdf-reports' && (
          <section className="pdf-section">
            <div className="section-header">
              <h2>PDF Report Generator</h2>
            </div>
            
            <div className="pdf-templates">
              <div className="template-card">
                <h4>Color Analysis Report</h4>
                <p>Professional color analysis with recommendations</p>
                <button className="generate-btn">Generate Template</button>
              </div>
              
              <div className="template-card">
                <h4>Style Guide Report</h4>
                <p>Comprehensive style guide with outfit suggestions</p>
                <button className="generate-btn">Generate Template</button>
              </div>
              
              <div className="template-card">
                <h4>Shopping List Report</h4>
                <p>Curated shopping recommendations</p>
                <button className="generate-btn">Generate Template</button>
              </div>
            </div>
            
            <div className="recent-reports">
              <h3>Recent Reports</h3>
              <div className="reports-list">
                {mlAnalyses.filter(a => a.status === 'completed').map(analysis => (
                  <div key={analysis.id} className="report-item">
                    <div className="report-info">
                      <h5>Client {analysis.clientId} - {analysis.season}</h5>
                      <span>Generated today</span>
                    </div>
                    <button 
                      className="download-btn"
                      onClick={() => generatePDFReport(analysis.id)}
                    >
                      📥 Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Content Management Section */}
        {currentSection === 'content-management' && (
          <section className="content-section">
            <div className="section-header">
              <h2>Dynamic Content System</h2>
              <button 
                className="action-btn"
                onClick={() => {
                  setEditingContent({
                    id: '',
                    type: 'service',
                    title: '',
                    content: '',
                    status: 'draft',
                    lastModified: new Date().toISOString()
                  })
                  setShowModal(true)
                }}
              >
                ➕ Add Content
              </button>
            </div>
            
            <div className="content-tabs">
              <button className="tab-btn active">All Content</button>
              <button className="tab-btn">Services</button>
              <button className="tab-btn">FAQs</button>
              <button className="tab-btn">Blog Posts</button>
            </div>
            
            <div className="content-grid">
              {contentItems.map(item => (
                <div key={item.id} className="content-card">
                  <div className="content-header">
                    <h4>{item.title}</h4>
                    <div className="content-meta">
                      <span className={`type-badge ${item.type}`}>{item.type}</span>
                      <span className={`status-badge ${item.status}`}>{item.status}</span>
                    </div>
                  </div>
                  
                  <div className="content-preview">
                    {item.content.substring(0, 100)}...
                  </div>
                  
                  <div className="content-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => {
                        setEditingContent(item)
                        setShowModal(true)
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button className="publish-btn">
                      {item.status === 'published' ? '📤 Unpublish' : '🚀 Publish'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {selectedAnalysis && 'ML Analysis Details'}
                {editingContent && 'Edit Content'}
              </h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <div className="modal-body">
              {selectedAnalysis && (
                <div className="analysis-details">
                  <div className="detail-section">
                    <h4>Analysis Results</h4>
                    <p><strong>Client ID:</strong> {selectedAnalysis.clientId}</p>
                    <p><strong>Season:</strong> {selectedAnalysis.season}</p>
                    <p><strong>Confidence:</strong> {Math.round(selectedAnalysis.confidence * 100)}%</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Color Palette</h4>
                    <div className="color-grid">
                      {selectedAnalysis.colors.map((color, idx) => (
                        <div key={idx} className="color-detail">
                          <div 
                            className="color-preview"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span>{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {editingContent && (
                <div className="content-editor">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        title: e.target.value
                      })}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={editingContent.type}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        type: e.target.value as 'service' | 'faq' | 'blog'
                      })}
                      className="form-select"
                    >
                      <option value="service">Service</option>
                      <option value="faq">FAQ</option>
                      <option value="blog">Blog Post</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Content</label>
                    <textarea
                      value={editingContent.content}
                      onChange={(e) => setEditingContent({
                        ...editingContent,
                        content: e.target.value
                      })}
                      className="form-textarea"
                      rows={10}
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={() => saveContent(editingContent)}
                    >
                      💾 Save
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: { [key: string]: string } = {
    'ml-analytics': 'Machine Learning Analytics',
    'pdf-reports': 'PDF Report Generator',
    'content-management': 'Content Management System'
  }
  return titles[section] || 'Enhanced Dashboard'
}