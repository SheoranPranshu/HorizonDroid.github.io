import React, { useState, useEffect } from 'react';
import '../components/css/Devices.css';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [filterCompany, setFilterCompany] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/HorizonV2/OTA/lineage-22.2/dinfo.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDevices(data.devices || []);
      } catch (err) {
        setError('Failed to fetch devices. Please check the data source and your network connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const fetchDeviceDetails = async (codename) => {
    setLoadingDetails(true);
    setDeviceDetails(null);
    setError(null);

    try {
      const variants = [];

      const gappsResponse = await fetch(`https://raw.githubusercontent.com/HorizonV2/OTA/lineage-22.2/GAPPS/${codename}.json`);
      if (gappsResponse.ok) {
        const gappsData = await gappsResponse.json();
        if (gappsData?.response?.[0]) {
            variants.push({ variant: 'GAPPS', ...gappsData.response[0] });
        }
      }

      const vanillaResponse = await fetch(`https://raw.githubusercontent.com/HorizonV2/OTA/lineage-22.2/VANILLA/${codename}.json`);
      if (vanillaResponse.ok) {
        const vanillaData = await vanillaResponse.json();
        if (vanillaData?.response?.[0]) {
            variants.push({ variant: 'VANILLA', ...vanillaData.response[0] });
        }
      }

      setDeviceDetails(variants);
    } catch (err) {
      setError('Failed to fetch device details. The ROM may not be available for this device.');
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    fetchDeviceDetails(device.codename);
  };

  const closeDeviceDetails = () => {
    setSelectedDevice(null);
    setDeviceDetails(null);
  };

  const companies = [...new Set(devices.map(device => device.company).filter(Boolean))];

  const filteredDevices = devices.filter(device => {
    const matchesCompany = filterCompany === 'all' || device.company === filterCompany;
    const matchesStatus = filterStatus === 'all' || device.status === filterStatus;
    const matchesSearch =
      (device.device_name && device.device_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (device.codename && device.codename.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCompany && matchesStatus && matchesSearch;
  });

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="devices-page">
        <div className="container">
          <div className="devices-loading">
            <div className="loading-spinner"></div>
            <p>Loading devices...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !selectedDevice) {
    return (
      <div className="devices-page">
        <div className="container">
          <div className="devices-error">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="devices-page">
      <div className="container">
        <div className="devices-header">
          <h1 className="section-title">Supported Devices</h1>
          <p className="devices-subtitle">Choose your device and start your HorizonDroid journey</p>

          <div className="devices-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filters-container">
              <select
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Brands</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
          </div>
        </div>

        <div className="devices-grid">
          {filteredDevices.map((device, index) => (
            <div
              key={device.codename || index}
              className="device-card"
              onClick={() => handleDeviceClick(device)}
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="device-image">
                {device.image_url ? (
                  <img src={device.image_url} alt={device.device_name || device.codename} />
                ) : (
                  <div className="device-placeholder">
                    <span>📱</span>
                  </div>
                )}
              </div>

              <div className="device-info">
                <h3 className="device-name">{device.device_name}</h3>
                <p className="device-codename"><span className="codename-text">{device.codename}</span></p>
                <p className="device-maintainer">
                  Maintainer: <span className="maintainer-name">{device.maintainer || 'Unknown'}</span>
                </p>

                {device.status && (
                  <span className={`device-status status-${device.status}`}>
                    {device.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredDevices.length === 0 && !loading && (
          <div className="no-devices">
            <h3>No devices found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {selectedDevice && (
        <div className="device-modal-overlay" onClick={closeDeviceDetails}>
          <div className="device-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedDevice.device_name}</h2>
              <button className="modal-close" onClick={closeDeviceDetails}>×</button>
            </div>

            <div className="modal-content">
              {loadingDetails ? (
                <div className="modal-loading">
                  <div className="loading-spinner"></div>
                  <p>Loading device details...</p>
                </div>
              ) : deviceDetails && deviceDetails.length > 0 ? (
                <div className="device-variants">
                  {deviceDetails.map((variant, idx) => (
                    <div key={idx} className="variant-card">
                      <div className="variant-header">
                        <h3>{variant.variant} Variant</h3>
                        <span className="build-type">{variant.buildtype}</span>
                      </div>

                      <div className="variant-details">
                        <div className="detail-row">
                          <span className="label">Version:</span>
                          <span className="value">{variant.version}</span>
                        </div>

                        <div className="detail-row">
                          <span className="label">Build Date:</span>
                          <span className="value">{formatDate(variant.datetime)}</span>
                        </div>

                        <div className="detail-row">
                          <span className="label">File Size:</span>
                          <span className="value">{formatFileSize(variant.size)}</span>
                        </div>

                        <div className="detail-row">
                          <span className="label">MD5:</span>
                          <span className="value code">{variant.md5}</span>
                        </div>

                        <div className="detail-row">
                          <span className="label">Filename:</span>
                          <span className="value code">{variant.filename}</span>
                        </div>
                      </div>

                      <div className="variant-actions">
                        <a
                          href={variant.download}
                          className="btn btn-download"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download {variant.variant}
                        </a>

                        {variant.changelogs && (
                          <a
                            href={variant.changelogs}
                            className="btn btn-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Changelog
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {selectedDevice.support_group && (
                    <div className="support-section">
                      <h4>Need Help?</h4>
                      <a
                        href={selectedDevice.support_group}
                        className="btn btn-guide"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Support Group
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="no-variants">
                  <h3>No ROM variants available</h3>
                  <p>This device doesn't have any ROM builds available yet.</p>
                  {error && <p className="error-message">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
