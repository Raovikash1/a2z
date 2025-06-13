import React, { useState } from 'react';

const JobList = ({ jobs, onEdit, onDelete, onStatusChange }) => {
  const [sortBy, setSortBy] = useState('postedDate');
  const [sortOrder, setSortOrder] = useState('desc');

  const sortedJobs = [...jobs].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'postedDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'paused': return '#f59e0b';
      case 'closed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="job-list">
      <div className="list-header">
        <div className="sort-controls">
          <span>Sort by:</span>
          <button 
            className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
            onClick={() => handleSort('title')}
          >
            Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'postedDate' ? 'active' : ''}`}
            onClick={() => handleSort('postedDate')}
          >
            Date {sortBy === 'postedDate' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
          <button 
            className={`sort-btn ${sortBy === 'applications' ? 'active' : ''}`}
            onClick={() => handleSort('applications')}
          >
            Applications {sortBy === 'applications' && (sortOrder === 'asc' ? '↑' : '↓')}
          </button>
        </div>
      </div>

      <div className="jobs-grid">
        {sortedJobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div className="job-title-section">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <div className="job-status">
                <select
                  value={job.status}
                  onChange={(e) => onStatusChange(job.id, e.target.value)}
                  className="status-select"
                  style={{ borderColor: getStatusColor(job.status) }}
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="job-details">
              <div className="job-info">
                <span className="info-item">
                  <span className="info-icon">📍</span>
                  {job.location}
                </span>
                <span className="info-item">
                  <span className="info-icon">💼</span>
                  {job.type}
                </span>
                {job.salary && (
                  <span className="info-item">
                    <span className="info-icon">💰</span>
                    {job.salary}
                  </span>
                )}
              </div>

              <div className="job-stats">
                <div className="stat">
                  <span className="stat-number">{job.applications}</span>
                  <span className="stat-label">Applications</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{job.postedDate}</span>
                  <span className="stat-label">Posted</span>
                </div>
              </div>
            </div>

            <div className="job-description">
              <p>{job.description.substring(0, 150)}...</p>
            </div>

            <div className="job-actions">
              <button 
                className="btn btn-outline"
                onClick={() => onEdit(job)}
              >
                Edit
              </button>
              <button 
                className="btn btn-outline view-btn"
                onClick={() => window.open(`/jobs/${job.id}`, '_blank')}
              >
                View
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => onDelete(job.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedJobs.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <h3>No jobs found</h3>
          <p>Start by creating your first job posting</p>
        </div>
      )}
    </div>
  );
};

export default JobList;