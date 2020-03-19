import React from 'react';

import TableViewer from 'react-js-table-with-csv-dl';

function PersonsTable({ title, data, filename }) {
  const formattedData = data.map(item => {
    return {
      Name: item.displayName,
      Phone: item.phone,
      Email: item.email,
      Address: item.address
    };
  });
  return (
    <TableViewer
      content={formattedData}
      headers={headers}
      filename={filename}
      minHeight={0}
      maxHeight={400}
      activateDownloadButton={true}
      pagination={30}
      topPagination={true}
      searchEnabled={false}
      caseInsensitive={true}
      headerCss={headerCss}
      downloadButtonStyle={buttonStyle}
    />
  );
}

export default PersonsTable;

const headers = ['Name', 'Phone', 'Email', 'Address'];

const headerCss = {
  backgroundColor: '#1e68bc',
  fontFamily: 'Nunito'
};

const buttonStyle = {
  padding: '7px 12px 7px 7px',
  borderRadius: '7px',
  fontFamily: 'Nunito'
};
