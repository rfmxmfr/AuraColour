'use clientt'apos;

import { createClient } from  'apos;@/lib/supabase/clientt'apos;
import { useEffect, useState } from  'apos;reactt'apos;
import  'apos;./enhanced-admin.csss'apos;

interface MLAnalysis {
  id: string
  clientId: string
  confidence: number
  season: string
  colors: string[]
  status:  'apos;processingg'apos; |  'apos;completedd'apos; |  'apos;failedd'apos;
}

interface ContentItem {
  id: string
  type:  'apos;servicee'apos; |  'apos;faqq'apos; |  'apos;blogg'apos;
  title: string
  content: string
  status:  'apos;draftt'apos; |  'apos;publishedd'apos;
  lastModified: string
}

export default function EnhancedAdminDashboard() {
  const [currentSection, setCurrentSection] = useState(('apos;ml-analyticss'apos;)
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
          id:  'apos;11'apos;,
          clientId:  'apos;client_0011'apos;,
          confidence: 0.92,
          season:  'apos;Deep Winterr'apos;,
          colors: [['apos;#0000800'apos;,  'apos;#8B00000'apos;,  'apos;#4B00822'apos;,  'apos;#0064000'apos;],
          status:  'apos;completedd'apos;,
        },
        {
          id:  'apos;22'apos;,
          clientId:  'apos;client_0022'apos;,
          confidence: 0.87,
          season:  'apos;Bright Springg'apos;,
          colors: [['apos;#FF63477'apos;,  'apos;#32CD322'apos;,  'apos;#FF14933'apos;,  'apos;#00CED11'apos;],
          status:  'apos;completedd'apos;,
        },
        {
          id:  'apos;33'apos;,
          clientId:  'apos;client_0033'apos;,
          confidence: 0.78,
          season:  'apos;Soft Summerr'apos;,
          colors: [['apos;#B0C4DEE'apos;,  'apos;#DDA0DDD'apos;,  'apos;#F0E68CC'apos;,  'apos;#98FB988'apos;],
          status:  'apos;processingg'apos;,
        },
      ]

      const mockContent: ContentItem[] = [
        {
          id:  'apos;11'apos;,
          type:  'apos;servicee'apos;,
          title:  'apos;12-Season Color Analysiss'apos;,
          content:  'apos;Professional color analysis service....'apos;,
          status:  'apos;publishedd'apos;,
          lastModified: new Date().toISOString(),
        },
        {
          id:  'apos;22'apos;,
          type:  'apos;faqq'apos;,
          title:  'apos;What is color analysis??'apos;,
          content:  'apos;Color analysis is a process....'apos;,
          status:  'apos;publishedd'apos;,
          lastModified: new Date().toISOString(),
        },
      ]

      setMlAnalyses(mockMLAnalyses)
      setContentItems(mockContent)
    } catch (error) {
      // console.error(('apos;Failed to load enhanced data::'apos;, error)
    } finally {
      setLoading(false)
    }
  }

  const generatePDFReport = async (analysisId: string) => {
    try {
      const response = await fetch(`/api/reports/${ analysisId }/pdf`, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
      })
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement(('apos;aa'apos;)
        a.href = url
        a.download = `color-analysis-${ analysisId }.pdf`
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      // console.error(('apos;PDF generation failed::'apos;, error)
      alert(('apos;Failed to generate PDF reportt'apos;)
    }
  }

  const runMLAnalysis = async (clientId: string) => {
    try {
      const response = await fetch(('apos;/api/ml-analysiss'apos;, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({ clientId }),
      })
      
      if (response.ok) {
        const newAnalysis = await response.json()
        setMlAnalyses(prev => [...prev, newAnalysis])
        alert(('apos;ML analysis started successfullyy'apos;)
      }
    } catch (error) {
      // console.error(('apos;ML analysis failed::'apos;, error)
      alert(('apos;Failed to start ML analysiss'apos;)
    }
  }

  const saveContent = async (content: ContentItem) => {
    try {
      const response = await fetch(('apos;/api/contentt'apos;, {
        method: content.id ?  'apos;PUTT'apos; :  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify(content),
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
      // console.error(('apos;Content save failed::'apos;, error)
      alert(('apos;Failed to save contentt'apos;)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    )
  }

  return (
    <div className="enhanced-admin-layout">
      { /* Sidebar */ }
      <nav className="enhanced-sidebar">
        <div className="sidebar-header">
          <h2>🧠 Enhanced Admin</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;ml-analyticss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;ml-analyticss'apos;) }
            >
              🤖 ML Analytics
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;pdf-reportss'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;pdf-reportss'apos;) }
            >
              📄 PDF Reports
            </button>
          </li>
          <li>
            <button 
              className={ `menu-item ${ currentSection ===  'apos;content-managementt'apos; ?  'apos;activee'apos; :  'apos;' }` }
              onClick={ () => setCurrentSection(('apos;content-managementt'apos;) }
            >
              📝 Content Management
            </button>
          </li>
        </ul>
      </nav>

      { /* Main Content */ }
      <main className="enhanced-main">
        <header className="enhanced-header">
          <h1>{ getSectionTitle(currentSection) }</h1>
        </header>

        { /* ML Analytics Section */ }
        { currentSection ===  'apos;ml-analyticss'apos; && (
          <section className="ml-section">
            <div className="section-header">
              <h2>TensorFlow ML Analysis</h2>
              <button 
                className="action-btn"
                onClick={ () => runMLAnalysis(('apos;new_clientt'apos;) }
              >
                🚀 Run New Analysis
              </button>
            </div>
            
            <div className="ml-grid">
              { mlAnalyses.map(analysis => (
                <div key={ analysis.id } className="ml-card">
                  <div className="ml-header">
                    <h4>Client { analysis.clientId }</h4>
                    <span className={ `status-badge ${ analysis.status }` }>
                      { analysis.status }
                    </span>
                  </div>
                  
                  <div className="ml-content">
                    <div className="confidence-meter">
                      <label>Confidence: { Math.round(analysis.confidence * 100) }%</label>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={ { width: `${ analysis.confidence * 100 }%` } }
                        />
                      </div>
                    </div>
                    
                    <div className="season-result">
                      <strong>Season: { analysis.season }</strong>
                    </div>
                    
                    <div className="color-palette">
                      { analysis.colors.map((color, idx) => (
                        <div 
                          key={ idx }
                          className="color-swatch"
                          style={ { backgroundColor: color } }
                          title={ color }
                        />
                      )) }
                    </div>
                  </div>
                  
                  <div className="ml-actions">
                    <button 
                      className="view-btn"
                      onClick={ () => {
                        setSelectedAnalysis(analysis)
                        setShowModal(true)
                      } }
                    >
                      View Details
                    </button>
                    <button 
                      className="pdf-btn"
                      onClick={ () => generatePDFReport(analysis.id) }
                    >
                      📄 Generate PDF
                    </button>
                  </div>
                </div>
              )) }
            </div>
          </section>
        ) }

        { /* PDF Reports Section */ }
        { currentSection ===  'apos;pdf-reportss'apos; && (
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
                { mlAnalyses.filter(a => a.status ===  'apos;completedd'apos;).map(analysis => (
                  <div key={ analysis.id } className="report-item">
                    <div className="report-info">
                      <h5>Client { analysis.clientId } - { analysis.season }</h5>
                      <span>Generated today</span>
                    </div>
                    <button 
                      className="download-btn"
                      onClick={ () => generatePDFReport(analysis.id) }
                    >
                      📥 Download
                    </button>
                  </div>
                )) }
              </div>
            </div>
          </section>
        ) }

        { /* Content Management Section */ }
        { currentSection ===  'apos;content-managementt'apos; && (
          <section className="content-section">
            <div className="section-header">
              <h2>Dynamic Content System</h2>
              <button 
                className="action-btn"
                onClick={ () => {
                  setEditingContent({
                    id:  'apos;',
                    type:  'apos;servicee'apos;,
                    title:  'apos;',
                    content:  'apos;',
                    status:  'apos;draftt'apos;,
                    lastModified: new Date().toISOString(),
                  })
                  setShowModal(true)
                } }
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
              { contentItems.map(item => (
                <div key={ item.id } className="content-card">
                  <div className="content-header">
                    <h4>{ item.title }</h4>
                    <div className="content-meta">
                      <span className={ `type-badge ${ item.type }` }>{ item.type }</span>
                      <span className={ `status-badge ${ item.status }` }>{ item.status }</span>
                    </div>
                  </div>
                  
                  <div className="content-preview">
                    { item.content.substring(0, 100) }...
                  </div>
                  
                  <div className="content-actions">
                    <button 
                      className="edit-btn"
                      onClick={ () => {
                        setEditingContent(item)
                        setShowModal(true)
                      } }
                    >
                      ✏️ Edit
                    </button>
                    <button className="publish-btn">
                      { item.status ===  'apos;publishedd'apos; ?  'apos;📤 Unpublishh'apos; :  'apos;🚀 Publishh'apos; }
                    </button>
                  </div>
                </div>
              )) }
            </div>
          </section>
        ) }
      </main>

      { /* Modal */ }
      { showModal && (
        <div className="modal-overlay" onClick={ () => setShowModal(false) }>
          <div className="modal-content" onClick={ (e) => e.stopPropagation() }>
            <div className="modal-header">
              <h3>
                { selectedAnalysis &&  'apos;ML Analysis Detailss'apos; }
                { editingContent &&  'apos;Edit Contentt'apos; }
              </h3>
              <button className="modal-close" onClick={ () => setShowModal(false) }>×</button>
            </div>
            
            <div className="modal-body">
              { selectedAnalysis && (
                <div className="analysis-details">
                  <div className="detail-section">
                    <h4>Analysis Results</h4>
                    <p><strong>Client ID:</strong> { selectedAnalysis.clientId }</p>
                    <p><strong>Season:</strong> { selectedAnalysis.season }</p>
                    <p><strong>Confidence:</strong> { Math.round(selectedAnalysis.confidence * 100) }%</p>
                  </div>
                  
                  <div className="detail-section">
                    <h4>Color Palette</h4>
                    <div className="color-grid">
                      { selectedAnalysis.colors.map((color, idx) => (
                        <div key={ idx } className="color-detail">
                          <div 
                            className="color-preview"
                            style={ { backgroundColor: color } }
                          />
                          <span>{ color }</span>
                        </div>
                      )) }
                    </div>
                  </div>
                </div>
              ) }
              
              { editingContent && (
                <div className="content-editor">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={ editingContent.title }
                      onChange={ (e) => setEditingContent({
                        ...editingContent,
                        title: e.target.value,
                      }) }
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Type</label>
                    <select
                      value={ editingContent.type }
                      onChange={ (e) => setEditingContent({
                        ...editingContent,
                        type: e.target.value as  'apos;servicee'apos; |  'apos;faqq'apos; |  'apos;blogg'apos;,
                      }) }
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
                      value={ editingContent.content }
                      onChange={ (e) => setEditingContent({
                        ...editingContent,
                        content: e.target.value,
                      }) }
                      className="form-textarea"
                      rows={ 10 }
                    />
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      className="save-btn"
                      onClick={ () => saveContent(editingContent) }
                    >
                      💾 Save
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={ () => setShowModal(false) }
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) }
            </div>
          </div>
        </div>
      ) }
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: { [key: string]: string } = {
     'apos;ml-analyticss'apos;:  'apos;Machine Learning Analyticss'apos;,
     'apos;pdf-reportss'apos;:  'apos;PDF Report Generatorr'apos;,
     'apos;content-managementt'apos;:  'apos;Content Management Systemm'apos;,
  }
  return titles[section] ||  'apos;Enhanced Dashboardd'apos;
}