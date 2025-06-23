import { useState, useEffect } from 'react';

interface SessionType {
  name: string;
  room: string;
}

interface ScheduleSlot {
  time: string;
  type?: string;
  content?: string;
  spans?: number;
  breakText?: string;
  sessions?: SessionType[];
}

interface RoomHeader {
  name: string;
  room: string;
}

interface DayInfo {
  value: string;
  label: string;
  date: string;
}

interface ScheduleData {
  days: DayInfo[];
  roomHeaders: RoomHeader[];
  schedules: {
    [key: string]: ScheduleSlot[];
  };
}

const ConferenceScheduleTable = () => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.BASE_URL}data/conferenceSchedule.json`);

        if (!response.ok) {
          throw new Error(`Failed to fetch schedule data. Status: ${response.status}`);
        }

        const data = await response.json();
        setScheduleData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading schedule data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  const getConferenceName = (sessionName: string) => {
    if (sessionName.includes('Panel')) return 'Panel Discussion';
    if (sessionName.includes('Keynote')) return 'Keynote';
    if (sessionName.includes('FCON')) return 'FastCon Workshop';
    if (sessionName.includes('CWS-SYM') || sessionName.includes('GraphD')) return 'GraphD Symposium';
    if (sessionName.includes('CWS-CON')) return 'ICWS Conference';
    if (sessionName.includes('QSW-SYM')) return 'QSW Symposium';
    if (sessionName.includes('QSW-CON')) return 'QSW Conference';
    if (sessionName.includes('WISC')) return 'WISC Symposium';
    if (sessionName.includes('CLD') || sessionName.includes('CLOUD')) return 'Cloud Conference';
    if (sessionName.includes('EDG') || sessionName.includes('EDGE')) return 'Edge Conference';
    if (sessionName.includes('ICDH')) return 'ICDH Conference';
    if (sessionName.includes('SSE') && !sessionName.includes('SSEdu')) return 'SSE Conference';
    if (sessionName.includes('ICWS')) return 'ICWS Conference';
    if (sessionName.includes('SUS')) return 'Sus/Res Symposium';
    if (sessionName.includes('SSEdu')) return 'SSEedu Symposium';
    return '';
  };

  const getSessionColor = (sessionName: string) => {
    if (!sessionName) return 'bg-gray-100 border-gray-300';

    if (sessionName.includes('Panel')) return 'bg-purple-200 border-purple-400';
    if (sessionName.includes('Keynote') || sessionName.includes('KEY')) return 'bg-violet-100 border-violet-300';
    if (sessionName.includes('FCON')) return 'bg-blue-100 border-blue-300';
    if (sessionName.includes('CWS-SYM') || sessionName.includes('GraphD')) return 'bg-green-100 border-green-300';
    if (sessionName.includes('CWS-CON')) return 'bg-indigo-100 border-indigo-300';
    if (sessionName.includes('QSW')) return 'bg-purple-100 border-purple-300';
    if (sessionName.includes('WISC')) return 'bg-yellow-100 border-yellow-300';
    if (sessionName.includes('CLD') || sessionName.includes('CLOUD')) return 'bg-cyan-100 border-cyan-300';
    if (sessionName.includes('EDG') || sessionName.includes('EDGE')) return 'bg-orange-100 border-orange-300';
    if (sessionName.includes('ICDH')) return 'bg-pink-100 border-pink-300';
    if (sessionName.includes('SSE') && !sessionName.includes('SSEdu')) return 'bg-red-100 border-red-300';
    if (sessionName.includes('ICWS') || sessionName.includes('Keynote')) return 'bg-indigo-100 border-indigo-300';
    if (sessionName.includes('SUS')) return 'bg-emerald-100 border-emerald-300';
    if (sessionName.includes('SSEdu')) return 'bg-amber-100 border-amber-300';
    return 'bg-gray-100 border-gray-300';
  };

  if (loading) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-lg font-medium">Loading schedule data...</p>
      </div>
    );
  }

  if (error || !scheduleData) {
    return (
      <div className="w-full p-8 text-center bg-red-50 rounded-lg">
        <p className="text-lg font-medium text-red-700">
          {error || 'Failed to load schedule data. Please try again later.'}
        </p>
      </div>
    );
  }

  const { days, roomHeaders } = scheduleData;
  const currentSchedule = scheduleData.schedules[selectedDay] || [];
  const currentDate = days.find(day => day.value === selectedDay)?.date || '';

  return (
    <div className="w-full overflow-x-auto bg-white shadow-lg rounded-lg">
      <div className="p-4 bg-gray-50 border-b">
        <label htmlFor="day-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Day:
        </label>
        <select
          id="day-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="block w-full max-w-xs px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {days.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
      </div>

      <div className="min-w-max">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 text-left font-semibold min-w-32">
                <div>Date</div>
                <div className="text-xs font-normal text-gray-600 mt-1">{currentDate}</div>
              </th>
              <th className="border border-gray-300 p-2 text-center font-semibold min-w-24">Time</th>
              {roomHeaders.map((header, index) => (
                <th key={index} className="border border-gray-300 p-2 text-center font-semibold min-w-20 text-xs">
                  <div className="font-semibold">{header.name}</div>
                  <div className="text-xs font-normal text-gray-600 mt-1">{header.room}</div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentSchedule.map((slot, slotIndex) => (
              <tr key={slotIndex} className="border-b border-gray-200">
                {slotIndex === 0 && (
                  <td rowSpan={currentSchedule.length} className="border border-gray-300 p-3 align-top bg-gray-50 font-medium">
                    <div>{currentDate}</div>
                  </td>
                )}

                {/* Time column */}
                <td className="border border-gray-300 p-2 text-center font-medium text-sm bg-gray-50">
                  {slot.time}
                </td>

                {/* Content columns */}
                {slot.type === 'registration' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-blue-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'lunch' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-green-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'opening' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-blue-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'keynote' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-indigo-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'networking' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-yellow-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'tour-prep' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-orange-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'tour' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-purple-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'reception' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-pink-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'free' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-gray-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'banquet' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-purple-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'closing' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-red-50 font-medium">
                    {slot.content}
                  </td>
                )}

                {slot.type === 'empty' && (
                  <td colSpan={slot.spans} className="border border-gray-300 p-3 text-center bg-white">
                    {slot.content}
                  </td>
                )}

                {/* Break slots without sessions */}
                {slot.type === 'break' && !slot.sessions && (
                  <td colSpan={roomHeaders.length} className="border border-gray-300 p-3 text-center bg-orange-50 font-medium">
                    {slot.breakText || "Coffee Break"}
                  </td>
                )}

                {slot.sessions && (
                  <>
                    {roomHeaders.map((header, headerIndex) => {
                      const session = slot.sessions?.find(s => {

                        if (s.room !== header.room) return false;

                        if (s.name.includes("Keynote") || s.name.includes("KEY")) return true;
                        if (s.name.includes("Panel")) return true;

                        if (header.name === "ICWS" && s.name.includes("CWS-CON")) return true;
                        if (header.name.includes("FastCon") && s.name.includes("FCON")) return true;
                        if (header.name.includes("GraphD") && (s.name.includes("CWS-SYM") || s.name.includes("GraphD"))) return true;
                        if (header.name === "QSW Symp" && s.name.includes("QSW-SYM")) return true;
                        if (header.name === "QSW" && s.name.includes("QSW-CON")) return true;
                        if (header.name.includes("WISC") && s.name.includes("WISC")) return true;
                        if (header.name.includes("CLOUD") && (s.name.includes("CLD") || s.name.includes("CLOUD"))) return true;
                        if (header.name.includes("EDGE") && (s.name.includes("EDG") || s.name.includes("EDGE"))) return true;
                        if (header.name.includes("ICDH") && s.name.includes("ICDH")) return true;
                        if (header.name.includes("SSE") && !header.name.includes("SSEedu") && s.name.includes("SSE") && !s.name.includes("SSEdu")) return true;
                        if (header.name.includes("SSEedu") && s.name.includes("SSEedu")) return true;
                        if (header.name.includes("Sus/Res") && s.name.includes("SUS")) return true;

                        return false;
                      });

                      const isBreakColumn = slot.type === 'break' && headerIndex >= 2 && headerIndex <= 11;

                      if (isBreakColumn && headerIndex === 2) {
                        return (
                          <td key={headerIndex} colSpan={10} className="border border-gray-300 p-3 text-center bg-orange-50 font-medium">
                            {slot.breakText}
                          </td>
                        );
                      } else if (isBreakColumn && headerIndex > 2) {
                        return null; // Skip these cells as they're part of the colspan
                      } else if (session) {
                        const conferenceName = getConferenceName(session.name);
                        return (
                          <td key={headerIndex} className={`border border-gray-300 p-2 text-center text-sm font-medium ${getSessionColor(session.name)}`}>
                            <div>{session.name}</div>
                            {conferenceName && <div className="text-xs text-gray-700 mt-1">{conferenceName}</div>}
                          </td>
                        );
                      } else {
                        return (
                          <td key={headerIndex} className="border border-gray-300 p-2 bg-gray-100">
                          </td>
                        );
                      }
                    })}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 border-t">
        <h4 className="font-semibold mb-2">Session Types:</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
            <span>FastContinuum Workshop</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
            <span>GraphD Symposium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
            <span>QSW Symposium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded"></div>
            <span>WISC Symposium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-cyan-100 border border-cyan-300 rounded"></div>
            <span>Cloud Conference</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></div>
            <span>Edge Conference</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pink-100 border border-pink-300 rounded"></div>
            <span>ICDH Conference</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
            <span>SSE Conference</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-indigo-100 border border-indigo-300 rounded"></div>
            <span>ICWS Conference & Keynotes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-emerald-100 border border-emerald-300 rounded"></div>
            <span>Sus/Res Symposium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-100 border border-amber-300 rounded"></div>
            <span>SSEedu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-violet-100 border-violet-300 rounded"></div>
            <span>Keynotes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-200 border-purple-400 rounded"></div>
            <span>Panel Discussions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceScheduleTable;