import React from 'react';

import TableViewer from 'react-js-table-with-csv-dl';

function PersonsTable({ title, data }) {
  //
  let headers = ['Name', 'Address', 'Phone'];

  const headerCss = {
    backgroundColor: '#1e68bc',
    fontFamily: 'Nunito'
  };

  const buttonStyle = {
    padding: '7px 12px 7px 7px',
    borderRadius: '7px',
    fontFamily: 'Nunito'
  };

  const titleStyle = {
    fontFamily: 'Nunito'
  };

  return (
    <TableViewer
      title={title}
      content={data}
      headers={headers}
      minHeight={0}
      maxHeight={400}
      activateDownloadButton={true}
      pagination={30}
      searchEnabled={true}
      caseInsensitive={true}
      headerCss={headerCss}
      downloadButtonStyle={buttonStyle}
      titleStyle={titleStyle}
    />
  );
}

export default PersonsTable;
