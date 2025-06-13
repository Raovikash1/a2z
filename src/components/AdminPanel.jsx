import React, { useState, useEffect } from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import './AdminPanel.css';

const AdminPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    applications: 0,
    pendingReview: 0
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    updateStats();
  }, [jobs]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Mock data for demonstration
      setJobs([
        {
          id: 1,
          title: 'Senior Software Engineer',
          company: 'Tech Corp',
          location: 'New York, NY',
          type: 'Full-time',
          salary: '$120,000 - $150,000',
          status: 'active',
          applications: 25,
          postedDate: '2024-01-15',
          description: 'We are looking for a senior software engineer...'
        },
        {
          id: 2,
          title: 'Product Manager',
          company: 'Innovation Inc',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$130,000 - $160,000',
          status: 'active',
          applications: 18,
          postedDate: '2024-01-12',
          description: 'Join our product team to drive innovation...'
        },
        {
          id: 3,
          title: 'UX Designer',
          company: 'Design Studio',
          location: 'Remote',
          type: 'Contract',
          salary: '$80,000 - $100,000',
          status: 'paused',
          applications: 12,
          postedDate: '2024-01-10',
          description: 'Create amazing user experiences...'
        }
      ]);
    }
  };

  const updateStats = () => {
    const totalJobs = jobs.length;
    const activeJobs = jobs.filter(job => job.status === 'active').length;
    const totalApplications = jobs.reduce((sum, job) => sum + (job.applications || 0), 0);
    const pendingReview = jobs.filter(job => job.status === 'pending').length;

    setStats({
      totalJobs,
      activeJobs,
      applications: totalApplications,
      pendingReview
    });
  };

  const handleCreateJob = (jobData) => {
    const newJob = {
      id: Date.now(),
      ...jobData,
      applications: 0,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    setJobs([...jobs, newJob]);
    setShowForm(false);
  };

  const handleEditJob = (jobData) => {
    setJobs(jobs.map(job => 
      job.id === editingJob.id ? { ...job, ...jobData } : job
    ));
    setEditingJob(null);
    setShowForm(false);
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const handleStatusChange = (jobId, newStatus) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  const startEditing = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="header-content">
          <h1>🔱 Babadham-A2Z Admin Panel</h1>
          <div className="header-actions">
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              + Post New Job
            </button>
          </div>
        </div>
      </header>

      <nav className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          Manage Jobs
        </button>
        <button 
          className={`nav-btn ${activeTab === 'applications' ? 'active' : ''}`}
          onClick={() => setActiveTab('applications')}
        >
          Applications
        </button>
        <button 
          className={`nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </nav>

      <main className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-content">
                  <h3>{stats.totalJobs}</h3>
                  <p>Total Jobs</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <h3>{stats.activeJobs}</h3>
                  <p>Active Jobs</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-content">
                  <h3>{stats.applications}</h3>
                  <p>Total Applications</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <h3>{stats.pendingReview}</h3>
                  <p>Pending Review</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Job Postings</h2>
              <div className="activity-list">
                {jobs.slice(0, 5).map(job => (
                  <div key={job.id} className="activity-item">
                    <div className="activity-info">
                      <h4>{job.title}</h4>
                      <p>{job.company} • {job.location}</p>
                      <span className="activity-date">Posted on {job.postedDate}</span>
                    </div>
                    <div className="activity-stats">
                      <span className={`status-badge ${job.status}`}>
                        {job.status}
                      </span>
                      <span className="applications-count">
                        {job.applications} applications
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="jobs-management">
            <div className="section-header">
              <h2>Job Management</h2>
              <div className="filters">
                <select className="filter-select">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="closed">Closed</option>
                </select>
                <input 
                  type="text" 
                  placeholder="Search jobs..." 
                  className="search-input"
                />
              </div>
            </div>
            <JobList 
              jobs={jobs}
              onEdit={startEditing}
              onDelete={handleDeleteJob}
              onStatusChange={handleStatusChange}
            />
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="applications-section">
            <h2>Job Applications</h2>
            <div className="applications-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">📋</div>
                <h3>Applications Management</h3>
                <p>View and manage job applications here. This feature will show all candidate applications with filtering and sorting options.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>Analytics & Reports</h2>
            <div className="analytics-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">📈</div>
                <h3>Analytics Dashboard</h3>
                <p>View detailed analytics about job performance, application trends, and hiring metrics.</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <JobForm 
              job={editingJob}
              onSubmit={editingJob ? handleEditJob : handleCreateJob}
              onCancel={cancelForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;