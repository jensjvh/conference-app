import React, { useEffect, useState } from 'react';
import {Typography} from '@mui/material';


type VehicleType = {
  formFactor: string;
};

type VehicleCountByType = {
  count: number;
  vehicleType: VehicleType;
};

type AvailableVehicles = {
  byType: VehicleCountByType[];
};

type Station = {
  stationId: string;
  name: string;
  allowPickup: boolean;
  availableVehicles: AvailableVehicles;
};

type AlertEntity = {
  __typename: string;
  gtfsId?: string;
};

type Alert = {
  alertHeaderText?: string;
  alertDescriptionText: string;
  alertUrl?: string;
  effectiveStartDate?: number;
  effectiveEndDate?: number;
  alertSeverityLevel?: string;
  entities?: AlertEntity[];
};

const LiveData: React.FC = () => {
  // Bike stations state
  const [stations, setStations] = useState<Station[]>([]);
  const [stationsLoading, setStationsLoading] = useState(false);
  const [stationsError, setStationsError] = useState<string | null>(null);

  // Alerts state
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(false);
  const [alertsError, setAlertsError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch bike stations
    setStationsLoading(true);
    setStationsError(null);
    fetch('http://localhost:3001/graphql-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            vehicleRentalStations {
              stationId
              name
              allowPickup
              availableVehicles {
                byType {
                  count
                  vehicleType {
                    formFactor
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.errors) throw new Error(data.errors.map((e: any) => e.message).join(', '));
        setStations(data.data.vehicleRentalStations);
      })
      .catch(err => setStationsError(err.message))
      .finally(() => setStationsLoading(false));

    // Fetch disruption alerts
    setAlertsLoading(true);
    setAlertsError(null);
    fetch('http://localhost:3001/graphql-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            alerts {
              alertHeaderText
              alertDescriptionText
              alertUrl
              effectiveStartDate
              effectiveEndDate
              alertSeverityLevel
              entities {
                __typename
                ... on Route {
                  gtfsId
                }
                ... on Stop {
                  gtfsId
                }
              }
            }
          }
        `,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data.errors) throw new Error(data.errors.map((e: any) => e.message).join(', '));
        setAlerts(data.data.alerts);
      })
      .catch(err => setAlertsError(err.message))
      .finally(() => setAlertsLoading(false));
  }, []);

  return (
    <div>
         <Typography variant="h4" sx={{ fontWeight: 'bold', pb: 3 }}>
             Live HSL Data
        </Typography>
      {/* Bike rental stations */}
      <section>
        <h2>Bike Rental Stations</h2>
        {stationsLoading && <div>Loading bike stations...</div>}
        {stationsError && <div>Error loading bike stations: {stationsError}</div>}
        {!stationsLoading && !stationsError && (
          <ul>
            {stations.map(station => (
              <li key={station.stationId}>
                <strong>{station.name}</strong> {station.allowPickup ? '(Pickup allowed)' : '(Pickup not allowed)'}
                <ul>
                  {station.availableVehicles.byType.map(({ count, vehicleType }, idx) => (
                    <li key={idx}>
                      {count} {vehicleType.formFactor.toLowerCase()}(s)
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Disruption alerts */}
      <section>
        <h2>Current Disruption Alerts</h2>
        {alertsLoading && <div>Loading disruption alerts...</div>}
        {alertsError && <div>Error loading disruption alerts: {alertsError}</div>}
        {!alertsLoading && !alertsError && alerts.length === 0 && <div>No current disruptions.</div>}
        {!alertsLoading && !alertsError && alerts.length > 0 && (
          <ul>
            {alerts.map((alert, i) => (
              <li key={i}>
                <strong>{alert.alertHeaderText || 'Alert'}</strong>
                <p>{alert.alertDescriptionText}</p>
                {alert.alertUrl && (
                  <p>
                    More info:{' '}
                    <a href={alert.alertUrl} target="_blank" rel="noopener noreferrer">
                      {alert.alertUrl}
                    </a>
                  </p>
                )}
                {alert.alertSeverityLevel && <p>Severity: {alert.alertSeverityLevel}</p>}
                {alert.effectiveStartDate && alert.effectiveEndDate && (
                  <p>
                    Effective from {new Date(alert.effectiveStartDate * 1000).toLocaleString()} to{' '}
                    {new Date(alert.effectiveEndDate * 1000).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default LiveData;
