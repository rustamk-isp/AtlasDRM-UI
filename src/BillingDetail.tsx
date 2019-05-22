import React, { useState } from 'react'
import CsvParse from '@vtex/react-csv-parse'
import {
  Block,
  FieldSelect,
  Heading,
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  Modal,
} from '@istreamplanet/pebble'

export default function BillingDetail(): JSX.Element {
  const [customers, setCustomers] = useState<{}[]>([])
  const [workStreams, setWorkStreams] = useState<string[]>([])
  const [csvData, setCSVData] = useState<string[]>([])
  const [workStreamSortDirection, setWorkStreamSortDirection] = useState<
    string | null
  >('ASC')
  const [showModal, setShowModal] = useState(false)

  const keys = [
    'Company',
    'WorkStream',
    'CompanyID',
    'AssetID',
    'ReturnCode',
    'Date',
    'Time',
    'WidevineCount',
    'FairPlayCount',
    'PrimetimeCount',
    'PlayReadyCount',
    'EntitlementEnforcementCount',
  ]

  function filterByWorkStream(arr: any, query: string): [] {
    return arr.filter(function(el: any): boolean{
      return el.WorkStream.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

  function filterByCompany(arr: any, query: string): [] {
    return arr.filter(function(el: any): boolean{
      return el.Company.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

  function createSelectOptions(item: string): {} {
    return { value: item, label: item }
  }

  function handleCSVData (data: []): void {
    setCustomers(
      [
        ...new Set<string>(
          data.map(({ Company }) =>
            Company !== ''
              ? Company
              : 'Unmaped Customers in CSV (If Customer is missing update CSV tool)'
          )
        ),
      ].map(createSelectOptions)
    )
    setCSVData(data)
    setShowModal(!showModal)
  }

  function handleError (e: any): void {}

  function selectedCompany(data: { value: string; label: string }): void {
    setWorkStreams([
      ...new Set<string>(
        filterByCompany(csvData, data.value).map(({ WorkStream }) =>
          WorkStream !== '' ? WorkStream : 'Uknown'
        )
      ),
    ])
    console.log([
      ...new Set<string>(
        filterByCompany(csvData, data.value).map(({ WorkStream }) =>
          WorkStream !== '' ? WorkStream : 'Uknown'
        )
      ),
    ])
  }

  function compare(): any {
    return function(a: any, b: any): any {
      const varA = typeof a === 'string' ? a.toUpperCase() : a
      const varB = typeof b === 'string' ? b.toUpperCase() : b

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return comparison
    }
  }

  function handleSort(title: string, prevDirection: any): void {
    let nextDirection = null

    if (prevDirection === 'ASC') {
      nextDirection = 'DESC'
    }

    if (prevDirection === 'DESC') {
      nextDirection = 'ASC'
    }

    if (prevDirection === null) {
      nextDirection = 'ASC'
    }

    if (title === 'workStream') {
      setWorkStreamSortDirection(nextDirection)
      return
    }
  }

  function getCountedDataForWorkStream(data: any): {}[] {
    let wv = 0
    let pr = 0
    let pt = 0
    let fp = 0
    let total = 0

    const ws:any = filterByWorkStream(csvData, data)

    for (var i = 0; i < ws.length; i++) {
      wv += parseInt(ws[i].WidevineCount)
      pr += parseInt(ws[i].PlayReadyCount)
      pt += parseInt(ws[i].PrimetimeCount)
      fp += parseInt(ws[i].FairPlayCount)
    }

    total += wv + pr + pt + fp

    return [
      {
        Primetime: pt,
        FairPlay: fp,
        Widevine: wv,
        PlayReady: pr,
        Total: total,
      },
    ]
  }

  function getSortedData(data: any): [] {
    if (workStreamSortDirection) {
      const sorted = data.sort(compare())

      if (workStreamSortDirection === 'ASC') {
        return sorted
      }

      if (workStreamSortDirection === 'DESC') {
        return sorted.reverse()
      }
    }
    return data
  }

  const Loading = (
    <Modal
      title='Default Modal'
      onRequestClose={() => setShowModal(!showModal)}
      showing={showModal}
    >
      CSV is loaded and parsed
    </Modal>
  )

  return (
    <Block direction='column' padding='3' itemSpacing='3'>
      {showModal && Loading}
      <div>
        {' '}
        <Heading element='2'>Step 1 : Load CSV File</Heading>
        <br />
        <CsvParse
          keys={keys}
          onDataUploaded={handleCSVData}
          onError={handleError}
          render={(
            onChange:
              | ((event: React.ChangeEvent<HTMLInputElement>) => void)
              | undefined
          ) => <input type='file' onChange={onChange} />}
        />
      </div>
      <br />
      <div>
        {' '}
        <Heading element='2'>Step 2 : Select Customer </Heading>
        <FieldSelect
          id='company_name'
          options={customers}
          isSearchable
          label='Company Name'
          helpText='Choose the Company to generate report for'
          menuPortalTarget={document.body}
          onChange={selectedCompany}
          loading={true}
          loadingMessage='Please Load in CSV'
        />
      </div>
      <br />
      <div>
        {' '}
        <Heading element='2'>Step 3 : Usage Data</Heading>{' '}
      </div>
      <Table width='200%'>
        <TableHeader>
          <TableHeaderCell
            sortDirection={workStreamSortDirection}
            onSort={() => handleSort('workStream', workStreamSortDirection)}
          ><div style={{ textAlign: 'right' }}>
            Work Stream</div>
          </TableHeaderCell>
          <TableHeaderCell><div style={{ textAlign: 'right' }}>Primetime</div></TableHeaderCell>
          <TableHeaderCell><div style={{ textAlign: 'right' }}>FairPlay</div></TableHeaderCell>
          <TableHeaderCell><div style={{ textAlign: 'right' }}>Widevine</div></TableHeaderCell>
          <TableHeaderCell><div style={{ textAlign: 'right' }}>PlayReady</div></TableHeaderCell>
          <TableHeaderCell><div style={{ textAlign: 'right' }}>Total</div></TableHeaderCell>
        </TableHeader>
        <TableBody>
          {getSortedData(workStreams).map((value: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{value}</TableCell>
              {getCountedDataForWorkStream(value).map((ws: any) => (
                <>
                  <TableCell>
                    <div style={{ textAlign: 'right' }}>{ws.Primetime}</div>
                  </TableCell>
                  <TableCell>
                    <div style={{ textAlign: 'right' }}>{ws.FairPlay}</div>
                  </TableCell>
                  <TableCell>
                    <div style={{ textAlign: 'right' }}>{ws.Widevine}</div>
                  </TableCell>
                  <TableCell>
                    <div style={{ textAlign: 'right' }}>{ws.PlayReady}</div>
                  </TableCell>
                  <TableCell>
                    <div style={{ textAlign: 'right' }}>{ws.Total}</div>
                  </TableCell>
                </>
              ))}
            </TableRow>
          ))}
          {
            <TableRow>
              <TableCell>
                <b>Totals</b>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </Block>
  )
}
