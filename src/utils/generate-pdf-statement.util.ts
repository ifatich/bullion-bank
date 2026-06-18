import html2pdf from 'html2pdf.js'

export interface EStatementConfig {
  title?: string
  companyName?: string
  companyId?: string
  reportPeriod?: string
  lastUpdated?: string
  transactions: Array<{
    no: string
    transactionHash: string
    fromCompany: string
    fromWallet: string
    toCompany: string
    toWallet: string
    date: string
    amount: string
  }>
}

export const generatePdfEStatement = async (config: EStatementConfig) => {
  const {
    title = 'Transaction History E-Statement',
    companyName = 'Bullion Bank',
    companyId = 'PT Bullion Bank Indonesia',
    reportPeriod = '1 Mar 2022 - 9 Mar 2022',
    lastUpdated = new Date().toLocaleString('id-ID'),
    transactions,
  } = config

  // Generate table rows HTML
  const tableRows = transactions
    .map(
      (tx, idx) => `
    <tr>
      <td style="text-align: center; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd;">${tx.no}</td>
      <td style="text-align: left; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd;">${tx.transactionHash}</td>
      <td style="text-align: left; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd;">${tx.fromCompany}</td>
      <td style="text-align: left; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd;">${tx.fromWallet}</td>
      <td style="text-align: left; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd;">${tx.toCompany}</td>
      <td style="text-align: left; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd;">${tx.toWallet}</td>
      <td style="text-align: center; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd;">${tx.date}</td>
      <td style="text-align: right; padding: 8px 4px; font-size: 11px; border-bottom: 1px solid #ddd; font-weight: 500;">${tx.amount}</td>
    </tr>
  `,
    )
    .join('')

  // Calculate totals
  const totalAmount = transactions
    .reduce((sum, tx) => {
      const amount = parseFloat(tx.amount.replace(/[^\d.]/g, ''))
      return sum + (isNaN(amount) ? 0 : amount)
    }, 0)
    .toFixed(2)

  // Create HTML content
  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="border-bottom: 3px solid #1a5f7a; padding-bottom: 15px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
          <div>
            <h1 style="margin: 0; color: #1a5f7a; font-size: 20px; font-weight: bold;">${companyName}</h1>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">${companyId}</p>
          </div>
          <div style="text-align: right; font-size: 11px; color: #666;">
            <p style="margin: 0;">Document No: BB-TH-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}</p>
            <p style="margin: 5px 0 0 0;">Generated: ${lastUpdated}</p>
          </div>
        </div>
      </div>

      <!-- Title and Period -->
      <div style="margin-bottom: 20px;">
        <h2 style="margin: 0 0 8px 0; color: #1a5f7a; font-size: 16px; font-weight: bold;">${title}</h2>
        <p style="margin: 0; color: #666; font-size: 12px;">
          <strong>Report Period:</strong> ${reportPeriod}
        </p>
      </div>

      <!-- Summary Info Box -->
      <div style="background-color: #f0f8fa; border-left: 4px solid #1a5f7a; padding: 12px; margin-bottom: 20px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 12px;">
          <div>
            <p style="margin: 0; color: #999;">Total Transactions</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #1a5f7a;">${transactions.length}</p>
          </div>
          <div>
            <p style="margin: 0; color: #999;">Total Amount</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #1a5f7a;">${totalAmount} KG</p>
          </div>
        </div>
      </div>

      <!-- Transaction Table -->
      <div style="margin-bottom: 20px;">
        <h3 style="margin: 0 0 12px 0; color: #1a5f7a; font-size: 13px; font-weight: bold;">Transaction Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr style="background-color: #1a5f7a; color: white;">
              <th style="text-align: center; padding: 10px 4px; font-weight: 600; border: none;">No</th>
              <th style="text-align: left; padding: 10px 4px; font-weight: 600; border: none;">Transaction Hash</th>
              <th style="text-align: left; padding: 10px 4px; font-weight: 600; border: none;">From Company</th>
              <th style="text-align: left; padding: 10px 4px; font-weight: 600; border: none;">From Wallet</th>
              <th style="text-align: left; padding: 10px 4px; font-weight: 600; border: none;">To Company</th>
              <th style="text-align: left; padding: 10px 4px; font-weight: 600; border: none;">To Wallet</th>
              <th style="text-align: center; padding: 10px 4px; font-weight: 600; border: none;">Date</th>
              <th style="text-align: right; padding: 10px 4px; font-weight: 600; border: none;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
            <tr style="background-color: #f9f9f9; font-weight: bold;">
              <td colspan="7" style="text-align: right; padding: 10px 4px; border-bottom: 2px solid #1a5f7a; border-top: 2px solid #1a5f7a;">Total Amount</td>
              <td style="text-align: right; padding: 10px 4px; border-bottom: 2px solid #1a5f7a; border-top: 2px solid #1a5f7a; color: #1a5f7a;">${totalAmount} KG</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #ddd; font-size: 10px; color: #999;">
        <p style="margin: 0 0 5px 0;">This is an electronically generated document. No physical signature is required.</p>
        <p style="margin: 0;">Document generated on ${new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'long' })}</p>
      </div>

    </div>
  `

  // Configure PDF options
  const element = document.createElement('div')
  element.innerHTML = htmlContent

  const options = {
    margin: [10, 10, 10, 10],
    filename: `transaction-history-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
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
