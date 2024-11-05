// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// const DonutChart = () => {
//   const initialData = [
//     { name: 'Kategori A', value: 400, active: true },
//     { name: 'Kategori B', value: 300, active: true },
//     { name: 'Kategori C', value: 300, active: true },
//     { name: 'Kategori D', value: 200, active: true },
//   ];

//   const [data, setData] = useState(initialData);
//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   // Handler untuk klik pada legend
//   const handleLegendClick = (entry) => {
//     const newData = data.map(item => {
//       if (item.name === entry.name) {
//         return { ...item, active: !item.active };
//       }
//       return item;
//     });
//     setData(newData);
//   };

//   // Custom renderer untuk legend yang bisa diklik
//   const renderCustomizedLegend = (props) => {
//     const { payload } = props;

//     return (
//       <div className="flex flex-wrap justify-center gap-4 mt-4">
//         {payload.map((entry, index) => (
//           <div
//             key={`legend-${index}`}
//             className={`flex items-center cursor-pointer p-2 rounded hover:bg-gray-100 
//               ${!data[index].active ? 'opacity-50' : ''}`}
//             onClick={() => handleLegendClick(data[index])}
//           >
//             <div
//               className="w-3 h-3 rounded-full mr-2"
//               style={{ backgroundColor: entry.color }}
//             />
//             <span>{entry.value}</span>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Filter data yang aktif untuk ditampilkan di chart
//   const activeData = data.filter(item => item.active);

//   return (
//     <div className="w-full h-96">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={activeData}
//             innerRadius={60}
//             outerRadius={80}
//             paddingAngle={5}
//             dataKey="value"
//           >
//             {activeData.map((entry, index) => (
//               <Cell 
//                 key={`cell-${index}`} 
//                 fill={COLORS[data.findIndex(item => item.name === entry.name) % COLORS.length]} 
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend content={renderCustomizedLegend} />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DonutChart;

import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DonutChart = () => {
  const initialData = [
    { name: 'Penghentian', value: 124, color: '#D4AF37', active: true },
    { name: 'Persidangan', value: 100, color: '#35C294', active: true },
    { name: 'Penyidikan', value: 100, color: '#3182CE', active: true }
  ];

  const [data, setData] = useState(initialData);

  const handleLegendClick = (clickedEntry) => {
    setData(data.map(entry => ({
      ...entry,
      active: entry.name === clickedEntry.name ? !entry.active : entry.active
    })));
  };

  const activeData = data.filter(item => item.active);
  const total = activeData.reduce((sum, item) => sum + item.value, 0);

  const renderCustomizedLegend = () => (
    <div className="relative h-32 w-full mt-4">
      {/* Top row - 2 items */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-8">
        {/* Penyidikan */}
        <div
          className="cursor-pointer"
          onClick={() => handleLegendClick(data[2])}
        >
          <div
            className={`text-white text-sm px-4 py-2 rounded transition-opacity duration-200 hover:opacity-80
              ${!data[2].active ? 'opacity-40' : 'opacity-100'}`}
            style={{ 
              backgroundColor: data[2].color,
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {data[2].name}
          </div>
        </div>

        {/* Penghentian */}
        <div
          className="cursor-pointer"
          onClick={() => handleLegendClick(data[0])}
        >
          <div
            className={`text-white text-sm px-4 py-2 rounded transition-opacity duration-200 hover:opacity-80
              ${!data[0].active ? 'opacity-40' : 'opacity-100'}`}
            style={{ 
              backgroundColor: data[0].color,
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {data[0].name}
          </div>
        </div>
      </div>

      {/* Bottom row - centered item */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div
          className="cursor-pointer"
          onClick={() => handleLegendClick(data[1])}
        >
          <div
            className={`text-white text-sm px-8 py-2 rounded transition-opacity duration-200 hover:opacity-80
              ${!data[1].active ? 'opacity-40' : 'opacity-100'}`}
            style={{ 
              backgroundColor: data[1].color,
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            {data[1].name}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900 p-6 rounded-lg">
      <div className="h-64 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={activeData}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {activeData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-gray-400 text-sm">Total</div>
          <div className="text-white text-2xl font-bold">{total}</div>
        </div>
      </div>
      {renderCustomizedLegend()}
    </div>
  );
};

export default DonutChart;