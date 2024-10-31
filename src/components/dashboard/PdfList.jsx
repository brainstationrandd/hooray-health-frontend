// src/components/dashboard/PdfList.jsx

// import React from 'react';
// import { FileText, Trash2 } from 'lucide-react';

// const PdfCard = ({ pdf, onDelete }) => (
//   <div className="bg-white bg-opacity-10 rounded-xl p-4 backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] hover:bg-opacity-20">
//     <div className="flex items-center space-x-4">
//       <div className="p-3 bg-purple-500 bg-opacity-20 rounded-lg">
//         <FileText className="h-6 w-6 text-purple-300" />
//       </div>
//       <div className="flex-1">
//         <h3 className="text-white font-medium truncate">
//           {pdf.name || 'Untitled PDF'}
//         </h3>
//         <p className="text-indigo-300 text-sm">
//           {pdf.size ? `${(pdf.size / 1024 / 1024).toFixed(2)} MB` : 'PDF Document'}
//         </p>
//       </div>
//       <div className="flex space-x-2">
//         <button 
//           className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all duration-200"
//           onClick={() => onDelete(pdf.name)}
//           title="Delete PDF"
//         >
//           <Trash2 className="h-5 w-5 text-red-300 hover:text-white" />
//         </button>
//       </div>
//     </div>
//   </div>
// );

// const PdfList = ({ pdfs, onDelete }) => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//     {pdfs.map((pdf, index) => (
//       <PdfCard 
//         key={pdf.id || index} 
//         pdf={pdf} 
//         onDelete={onDelete}
//       />
//     ))}
//   </div>
// );

// export default PdfList;


// src/components/dashboard/PdfList.jsx

import React from 'react';
import { FileText, Trash2 } from 'lucide-react';

const PdfCard = ({ pdf, onDelete }) => (
  <div className="bg-white bg-opacity-10 rounded-xl p-6 max-w-md backdrop-blur-lg transition-all duration-300 hover:scale-[1.05] hover:bg-opacity-20">
    <div className="flex items-center space-x-4">
      <div className="p-4 bg-purple-500 bg-opacity-20 rounded-lg">
        <FileText className="h-8 w-8 text-purple-300" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-medium text-lg break-words">
          {pdf.name || 'Untitled PDF'}
        </h3>
        <p className="text-indigo-300 text-sm mt-1">
          {pdf.size ? `${(pdf.size / 1024 / 1024).toFixed(2)} MB` : 'PDF Document'}
        </p>
      </div>
      <div className="flex space-x-2">
        <button 
          className="p-2 hover:bg-red-500 hover:bg-opacity-20 rounded-lg transition-all duration-200"
          onClick={() => onDelete(pdf.name)}
          title="Delete PDF"
        >
          <Trash2 className="h-5 w-5 text-red-300 hover:text-white" />
        </button>
      </div>
    </div>
  </div>
);

const PdfList = ({ pdfs, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {pdfs.map((pdf, index) => (
      <PdfCard 
        key={pdf.id || index} 
        pdf={pdf} 
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default PdfList;
