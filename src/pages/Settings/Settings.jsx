import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Form/Input';
import { Dropdown } from '../../components/Form/Dropdown';
import { RadioGroup } from '../../components/Form/RadioGroup';
import './Settings.css';
import { useTheme } from '../../contexts/ThemeContext';

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'system', label: 'System Default' }
  ];

  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'en',
    notifications: true,
    dateFormat: 'DD/MM/YYYY',
    timezone: 'UTC+05:30'
  });

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' }
  ];

  const dateFormats = [
    { value: 'DD/MM/YYYY', label: '31/12/2024' },
    { value: 'MM/DD/YYYY', label: '12/31/2024' },
    { value: 'YYYY-MM-DD', label: '2024-12-31' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  return (
    <div className="settings-container">
      <h1>System Settings</h1>

      <form onSubmit={handleSubmit} className="settings-form">
        {/* Appearance Section */}
        <fieldset className="settings-section">
          <legend>Appearance</legend>

          <div className="settings-grid">
            <RadioGroup
              label="Theme"
              name="theme"
              options={[
                { value: 'light', label: 'Light Theme' },
                { value: 'dark', label: 'Dark Theme' },
                { value: 'system', label: 'System Default' }
              ]}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />

            <div className="theme-preview">
              <div className={`theme-example ${settings.theme}-theme`}>
                <div className="theme-header"></div>
                <div className="theme-content"></div>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Regional Settings */}
        <fieldset className="settings-section">
          <legend>Regional</legend>

          <div className="settings-grid">
            <Dropdown
              label="Language"
              options={languages}
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
            />

            <Dropdown
              label="Date Format"
              options={dateFormats}
              value={settings.dateFormat}
              onChange={(e) =>
                setSettings({ ...settings, dateFormat: e.target.value })
              }
            />

            <Input
              label="Timezone"
              type="text"
              value={settings.timezone}
              readOnly
            />
          </div>
        </fieldset>

        {/* Notifications */}
        <fieldset className="settings-section">
          <legend>Notifications</legend>

          <div className="settings-grid">
            <RadioGroup
              label="Email Notifications"
              name="notifications"
              options={[
                { value: 'true', label: 'Enabled' },
                { value: 'false', label: 'Disabled' }
              ]}
              value={settings.notifications.toString()}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: e.target.value === 'true'
                })
              }
            />
          </div>
        </fieldset>

        <div className="form-actions">
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
          <Button type="button" variant="secondary">
            Reset Defaults
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
