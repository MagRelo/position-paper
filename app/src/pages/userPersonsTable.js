import React from 'react';

import TableViewer from 'react-js-table-with-csv-dl';

function PersonsTable({ title, data }) {
  return (
    <TableViewer
      content={data}
      headers={headers}
      minHeight={0}
      maxHeight={400}
      activateDownloadButton={true}
      pagination={30}
      topPagination={true}
      searchEnabled={true}
      caseInsensitive={true}
      headerCss={headerCss}
      downloadButtonStyle={buttonStyle}
    />
  );
}

export default PersonsTable;

const headers = ['Name', 'Address', 'Phone'];

const headerCss = {
  backgroundColor: '#1e68bc',
  fontFamily: 'Nunito'
};

const buttonStyle = {
  padding: '7px 12px 7px 7px',
  borderRadius: '7px',
  fontFamily: 'Nunito'
};
