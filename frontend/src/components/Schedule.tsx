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

// Session types, keywords, colors
const SESSION_TYPES = [
  { label: 'Panel Discussions', keywords: ['Panel'], color: 'bg-purple-200 border-purple-400' },
  { label: 'FastContinuum Workshop', keywords: ['FCON'], color: 'bg-blue-100 border-blue-300' },
  { label: 'GraphD Symposium', keywords: ['CWS-SYM', 'GraphD'], color: 'bg-green-100 border-green-300' },
  { label: 'ICWS Conference & Keynotes', keywords: ['ICWS', 'CWS-CON'], color: 'bg-indigo-100 border-indigo-300' },
  { label: 'QSW Symposium', keywords: ['QSW'], color: 'bg-purple-100 border-purple-300' },
  { label: 'WISC Symposium', keywords: ['WISC'], color: 'bg-yellow-100 border-yellow-300' },
  { label: 'Cloud Conference', keywords: ['CLD', 'CLOUD', 'Keynote'], color: 'bg-cyan-100 border-cyan-300' },
  { label: 'Edge Conference', keywords: ['EDG', 'EDGE'], color: 'bg-orange-100 border-orange-300' },
  { label: 'ICDH Conference', keywords: ['ICDH'], color: 'bg-pink-100 border-pink-300' },
  { label: 'SSE Conference', keywords: ['SSE'], excludeKeywords: ['SSEdu'], color: 'bg-red-100 border-red-300' },
  { label: 'Sus/Res Symposium', keywords: ['SUS'], color: 'bg-emerald-100 border-emerald-300' },
  { label: 'SSEedu', keywords: ['SSEedu'], color: 'bg-amber-100 border-amber-300' },
];

const HEADER_SESSION_KEYWORDS: Record<string, string[]> = {
  'FastCon WS': ['FCON-WS'],
  'GraphD Symp': ['CWS-SYM'],
  'Sus/Res Symp': ['SUS-SYM'],
  'QSW Symp': ['QSW-SYM'],
  'SSEedu Symp/WISC Symp': ['SSEedu-SYM', 'WISC-SYM'],
  'ICWS': ['CWS-CON', 'ICWS'],
  'CLOUD': ['CLD-CON'],
  'EDGE': ['EDG-CON'],
  'QSW': ['QSW-CON'],
  'ICDH': ['ICDH-CON'],
  'SSE': ['SSE-CON'], 
};



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

    if (sessionName.includes('SSEedu') || sessionName.includes('SSEedu-SYM')) return 'SSEedu Symposium';
    if (sessionName.includes('SSE')) return 'SSE Conference';
    if (sessionName.includes('ICWS')) return 'ICWS Conference';
    if (sessionName.includes('SUS')) return 'Sus/Res Symposium';
    return '';
  };

  const getSessionColor = (sessionName: string) => {
    if (!sessionName) return 'bg-gray-100 border-gray-300';

    for (const sessionType of SESSION_TYPES) {
      const matchesKeyword = sessionType.keywords.some((kw) => sessionName.includes(kw));
      const matchesExclude = sessionType.excludeKeywords?.some((kw) => sessionName.includes(kw));
      if (matchesKeyword && !matchesExclude) {
        return sessionType.color;
      }
    }
    return 'bg-gray-100 border-gray-300';
  };

  // Function to check if session matches header by keyword
  const sessionMatchesHeader = (headerName: string, sessionName: string) => {
    const keywords = HEADER_SESSION_KEYWORDS[headerName];
    if (!keywords) return false;
    return keywords.some(keyword => sessionName.includes(keyword));
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
  const currentDate = days.find((day) => day.value === selectedDay)?.date || '';

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
                <th
                  key={index}
                  className="border border-gray-300 p-2 text-center font-semibold min-w-20 text-xs"
                >
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
                  <td
                    rowSpan={currentSchedule.length}
                    className="border border-gray-300 p-3 align-top bg-gray-50 font-medium"
                  >
                    <div>{currentDate}</div>
                  </td>
                )}

                <td className="border border-gray-300 p-2 text-center font-medium text-sm bg-gray-50">
                  {slot.time}
                </td>

                {slot.type === 'registration' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-blue-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'lunch' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-green-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'break' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-yellow-50 font-medium"
                  >
                    {slot.breakText}
                  </td>
                )}

                {slot.type === 'opening' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-blue-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'keynote' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-indigo-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'networking' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-yellow-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'tour-prep' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-orange-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'tour' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-purple-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'reception' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-pink-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'free' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-gray-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'banquet' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-purple-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {slot.type === 'closing' && (
                  <td
                    colSpan={slot.spans}
                    className="border border-gray-300 p-3 text-center bg-indigo-50 font-medium"
                  >
                    {slot.content}
                  </td>
                )}

                {!slot.type && (() => {
                  let skipRooms = 0; // count how many columns to skip because of spanning
                  return roomHeaders.map((header, roomIndex) => {
                    if (skipRooms > 0) {
                      skipRooms--;
                      return null; // skip rendering this cell because it's covered by previous colspan
                    }

                    const isSpecialSession = (sessionName: string) => {
                      const specialTypes = ['Keynote', 'Opening', 'Closing'];
                      return specialTypes.some((type) => sessionName.includes(type));
                    };

                    const session = slot.sessions?.find((s) => s.room === header.room && (sessionMatchesHeader(header.name, s.name) || isSpecialSession(s.name)));

                    if (!session) {
                      return (
                        <td key={roomIndex} className="border border-gray-300 p-2"></td>
                      );
                    }

                    const colSpan = (session.name === 'ICWS Keynote' || session.name.includes('ICWS Panel')) ? 3 : 1;


                    if (colSpan > 1) {
                      skipRooms = colSpan - 1; // skip next rooms covered by this colspan
                    }

                    const colorClass = getSessionColor(session.name);

                    return (
                      <td
                        key={roomIndex}
                        colSpan={colSpan}
                        className={`border border-gray-300 p-2 text-xs text-center align-middle font-semibold ${colorClass}`}
                        title={`${session.name} (${getConferenceName(session.name)})`}
                      >
                        {session.name}
                      </td>
                    );
                  });
                })()}

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="p-4 bg-gray-50 border-t">
        <h4 className="font-semibold mb-2">Session Types:</h4>
        <div className="flex flex-wrap gap-4 text-sm">
          {SESSION_TYPES.map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded border ${color}`}></div>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConferenceScheduleTable;
