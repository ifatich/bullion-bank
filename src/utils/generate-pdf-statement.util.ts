import html2pdf from 'html2pdf.js'

export interface EStatementConfig {
  title?: string
  companyName?: string
  companyId?: string
  custodyAccountId?: string
  walletId?: string
  reportPeriod?: string
  openingBalance?: string
  totalDebit?: string
  totalCredit?: string
  closingBalance?: string
  lastUpdated?: string
  transactions: Array<{
    no: string
    transactionHash: string
    referenceNumber: string
    transactionType: string
    status: 'Success' | 'Pending' | 'Failed'
    fromCompany: string
    fromWallet: string
    fromAddress: string
    toCompany: string
    toWallet: string
    toAddress: string
    date: string
    confirmedAt: string
    asset: string
    network: string
    amount: string
    fee: string
    netAmount: string
    fiatValue: string
    blockNumber: string
    confirmations: string
  }>
}

type EStatementTransaction = EStatementConfig['transactions'][number]

export const generatePdfEStatement = async (config: EStatementConfig) => {
  const colors = {
    green: '#00ab4e',
    greenDark: '#00662e',
    greenSoft: '#e6f6ea',
    black80: '#252528',
    black60: '#58585b',
    black50: '#939597',
    black20: '#eeeeef',
    black10: '#f8f8f8',
    white: '#ffffff',
  }

  const {
    title = 'Custody Transaction Report',
    companyName = 'PT Bullion Bank Indonesia',
    companyId = 'PT Bullion Bank Indonesia',
    custodyAccountId = '-',
    walletId = '-',
    reportPeriod = '1 Mar 2022 - 9 Mar 2022',
    openingBalance = '-',
    totalDebit = '-',
    totalCredit = '-',
    closingBalance = '-',
    lastUpdated = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'long' }),
    transactions,
  } = config

  const statusColor = (status: EStatementTransaction['status']) => {
    if (status === 'Success') return colors.green
    if (status === 'Pending') return '#b65f00'
    return '#ae1e22'
  }

  const firstPageRows = 4
  const nextPageRows = 8
  const transactionChunks = [
    transactions.slice(0, firstPageRows),
    ...Array.from(
      { length: Math.ceil(Math.max(transactions.length - firstPageRows, 0) / nextPageRows) },
      (_, index) =>
        transactions.slice(
          firstPageRows + index * nextPageRows,
          firstPageRows + (index + 1) * nextPageRows,
        ),
    ),
  ].filter((chunk) => chunk.length > 0)

  const renderTableRows = (chunk: EStatementConfig['transactions'], chunkIndex: number) =>
    chunk
      .map((tx, rowIndex) => {
        const globalIndex =
          chunkIndex === 0 ? rowIndex : firstPageRows + (chunkIndex - 1) * nextPageRows + rowIndex

        return `
          <tr style="background-color: ${globalIndex % 2 === 0 ? colors.white : colors.black10};">
            <td style="width: 24px; text-align: center; padding: 8px 6px; font-size: 10px; line-height: 14px; color: ${colors.black60}; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">${tx.no}</td>
            <td style="width: 98px; text-align: left; padding: 8px 6px; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">
              <p style="margin: 0 0 3px 0; font-size: 10px; line-height: 14px; color: ${colors.black60}; font-weight: 800;">${tx.transactionHash}</p>
              <p style="margin: 0; font-size: 9px; line-height: 13px; color: ${colors.black50}; font-weight: 600;">${tx.referenceNumber}</p>
            </td>
            <td style="width: 62px; text-align: left; padding: 8px 6px; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">
              <p style="margin: 0 0 3px 0; font-size: 10px; line-height: 14px; color: ${colors.black60}; font-weight: 800;">${tx.transactionType}</p>
              <p style="margin: 0; font-size: 9px; line-height: 13px; color: ${statusColor(tx.status)}; font-weight: 800;">${tx.status}</p>
            </td>
            <td style="width: 124px; text-align: left; padding: 8px 6px; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">
              <p style="margin: 0 0 3px 0; font-size: 10px; line-height: 14px; color: ${colors.black60}; font-weight: 800;">${tx.fromCompany}</p>
              <p style="margin: 0 0 3px 0; font-size: 9px; line-height: 13px; color: ${colors.black60}; font-weight: 600;">${tx.fromWallet}</p>
              <p style="margin: 0; font-size: 8px; line-height: 11px; color: ${colors.black50}; font-weight: 600; word-break: break-all;">${tx.fromAddress}</p>
            </td>
            <td style="width: 124px; text-align: left; padding: 8px 6px; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">
              <p style="margin: 0 0 3px 0; font-size: 10px; line-height: 14px; color: ${colors.black60}; font-weight: 800;">${tx.toCompany}</p>
              <p style="margin: 0 0 3px 0; font-size: 9px; line-height: 13px; color: ${colors.black60}; font-weight: 600;">${tx.toWallet}</p>
              <p style="margin: 0; font-size: 8px; line-height: 11px; color: ${colors.black50}; font-weight: 600; word-break: break-all;">${tx.toAddress}</p>
            </td>
            <td style="width: 62px; text-align: left; padding: 8px 6px; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">
              <p style="margin: 0 0 3px 0; font-size: 10px; line-height: 14px; color: ${colors.black60}; font-weight: 800;">${tx.asset}</p>
              <p style="margin: 0; font-size: 8px; line-height: 11px; color: ${colors.black50}; font-weight: 600;">${tx.network}</p>
            </td>
            <td style="width: 58px; text-align: center; padding: 8px 6px; font-size: 10px; line-height: 14px; color: ${colors.black60}; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">${tx.date}</td>
            <td style="width: 58px; text-align: right; padding: 8px 6px; border-right: 1px solid ${colors.black20}; border-bottom: 1px solid ${colors.black20};">
              <p style="margin: 0 0 3px 0; font-size: 10px; line-height: 14px; color: ${colors.black60}; font-weight: 800;">${tx.amount}</p>
              <p style="margin: 0; font-size: 8px; line-height: 11px; color: ${colors.black50}; font-weight: 600;">Fee ${tx.fee}</p>
            </td>
            <td style="width: 58px; text-align: right; padding: 8px 6px; font-size: 10px; line-height: 14px; color: ${colors.black60}; border-bottom: 1px solid ${colors.black20}; font-weight: 800;">${tx.netAmount}</td>
          </tr>
        `
      })
      .join('')

  const renderTransactionTable = (chunk: EStatementConfig['transactions'], chunkIndex: number) => {
    const isLastChunk = chunkIndex === transactionChunks.length - 1

    return `
      <div class="pdf-page ${isLastChunk ? 'pdf-page--last' : ''}" style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 12px 0; color: ${colors.black80}; font-size: 12px; line-height: 16px; font-weight: 800;">Custody Transaction Details${transactionChunks.length > 1 ? ` (${chunkIndex + 1}/${transactionChunks.length})` : ''}</h3>
        <table style="width: 100%; border: 1px solid ${colors.black20}; border-collapse: separate; border-spacing: 0; border-radius: 6px; font-size: 10px; table-layout: fixed;">
          <thead>
            <tr style="background-color: ${colors.green}; color: ${colors.white};">
              <th style="width: 24px; text-align: center; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">No</th>
              <th style="width: 98px; text-align: left; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">Hash / Reference</th>
              <th style="width: 62px; text-align: left; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">Type / Status</th>
              <th style="width: 124px; text-align: left; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">From</th>
              <th style="width: 124px; text-align: left; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">To</th>
              <th style="width: 62px; text-align: left; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">Asset</th>
              <th style="width: 58px; text-align: center; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">Date</th>
              <th style="width: 58px; text-align: right; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800; border-right: 1px solid ${colors.black20};">Amount / Fee</th>
              <th style="width: 58px; text-align: right; padding: 9px 6px; font-size: 10px; line-height: 14px; font-weight: 800;">Net</th>
            </tr>
          </thead>
          <tbody>
            ${renderTableRows(chunk, chunkIndex)}
            ${
              isLastChunk
                ? `<tr style="background-color: ${colors.greenSoft}; font-weight: 800;">
                    <td colspan="8" style="text-align: right; padding: 10px 8px; color: ${colors.black80}; border-top: 2px solid ${colors.green};">Closing Balance</td>
                    <td style="text-align: right; padding: 10px 8px; color: ${colors.greenDark}; border-top: 2px solid ${colors.green};">${closingBalance}</td>
                  </tr>`
                : ''
            }
          </tbody>
        </table>
      </div>
    `
  }

  // Create HTML content
  const htmlContent = `
    <style>
      .pdf-page {
        break-inside: avoid;
        page-break-inside: avoid;
      }

      .pdf-page:not(.pdf-page--last) {
        break-after: page;
        page-break-after: always;
      }
    </style>

    <div style="font-family: 'Nunito Sans', 'Segoe UI', Arial, sans-serif; max-width: 1100px; margin: 0 auto; padding: 18px; color: ${colors.black80};">
      
      <!-- Header -->
      <div style="border-bottom: 3px solid ${colors.green}; padding-bottom: 15px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
          <div>
            <h1 style="margin: 0; color: ${colors.black80}; font-size: 20px; line-height: 30px; font-weight: 800;">${companyName}</h1>
            <p style="margin: 5px 0 0 0; color: ${colors.black60}; font-size: 12px; line-height: 18px; font-weight: 600;">${companyId}</p>
          </div>
          <div style="text-align: right; font-size: 11px; line-height: 16px; color: ${colors.black60}; font-weight: 600;">
            <p style="margin: 0;">Document No: BB-TH-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}</p>
            <p style="margin: 5px 0 0 0;">Generated: ${lastUpdated}</p>
          </div>
        </div>
      </div>

      <!-- Title and Period -->
      <div style="margin-bottom: 20px;">
        <h2 style="margin: 0 0 8px 0; color: ${colors.black80}; font-size: 16px; line-height: 24px; font-weight: 800;">${title}</h2>
        <p style="margin: 0; color: ${colors.black60}; font-size: 12px; line-height: 18px; font-weight: 600;">
          <strong>Report Period:</strong> ${reportPeriod}
        </p>
        <p style="margin: 4px 0 0 0; color: ${colors.black60}; font-size: 12px; line-height: 18px; font-weight: 600;">
          <strong>Custody Account:</strong> ${custodyAccountId} &nbsp; | &nbsp; <strong>Wallet ID:</strong> ${walletId}
        </p>
      </div>

      <!-- Summary Info Box -->
      <div style="background-color: ${colors.greenSoft}; border: 1px solid ${colors.black20}; border-left: 4px solid ${colors.green}; border-radius: 6px; padding: 12px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; font-size: 12px;">
          <div>
            <p style="margin: 0; color: ${colors.black50}; font-size: 11px; line-height: 16px; font-weight: 600;">Opening Balance</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 20px; font-weight: 800; color: ${colors.greenDark};">${openingBalance}</p>
          </div>
          <div>
            <p style="margin: 0; color: ${colors.black50}; font-size: 11px; line-height: 16px; font-weight: 600;">Total Debit</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 20px; font-weight: 800; color: ${colors.greenDark};">${totalDebit}</p>
          </div>
          <div>
            <p style="margin: 0; color: ${colors.black50}; font-size: 11px; line-height: 16px; font-weight: 600;">Total Credit</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 20px; font-weight: 800; color: ${colors.greenDark};">${totalCredit}</p>
          </div>
          <div>
            <p style="margin: 0; color: ${colors.black50}; font-size: 11px; line-height: 16px; font-weight: 600;">Closing Balance</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 20px; font-weight: 800; color: ${colors.greenDark};">${closingBalance}</p>
          </div>
          <div>
            <p style="margin: 0; color: ${colors.black50}; font-size: 11px; line-height: 16px; font-weight: 600;">Transaction Count</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 20px; font-weight: 800; color: ${colors.greenDark};">${transactions.length}</p>
          </div>
          <div>
            <p style="margin: 0; color: ${colors.black50}; font-size: 11px; line-height: 16px; font-weight: 600;">Asset Scope</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; line-height: 20px; font-weight: 800; color: ${colors.greenDark};">PAXG / PGT</p>
          </div>
        </div>
      </div>

      <!-- Transaction Table -->
      ${transactionChunks.map((chunk, index) => renderTransactionTable(chunk, index)).join('')}

      <!-- Footer -->
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid ${colors.black20}; font-size: 10px; line-height: 14px; color: ${colors.black50}; font-weight: 600;">
        <p style="margin: 0 0 5px 0;">This custody report is generated from front-office transaction records and includes wallet identifiers, asset movement, confirmation status, and custody balance summary.</p>
        <p style="margin: 0;">Document generated on ${new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'long' })}</p>
      </div>

    </div>
  `

  // Configure PDF options
  const element = document.createElement('div')
  element.innerHTML = htmlContent

  const options = {
    margin: [10, 10, 10, 10],
    filename: `custody-report-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
    pagebreak: {
      mode: ['css'],
    },
  }

  // Generate PDF
  try {
    await html2pdf().set(options).from(element).save()
    return true
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
