/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - HALLOWEEN RSVP WEB APP HANDLER
 * =========================================================================
 * Cara Setup (Hanya butuh 2 Menit):
 * 1. Buka Google Sheets baru di https://sheets.new
 * 2. Beri nama spreadsheet, misal: "RSVP Halloween Party 2026"
 * 3. Di baris pertama (Row 1), buat header kolom berikut:
 *    A1: Timestamp
 *    B1: Nama Lengkap
 *    C1: Divisi / Tim
 *    D1: Status Kehadiran
 *    E1: Rencana Kostum
 *    F1: Request Lagu / Catatan
 * 4. Klik menu: Extensions (Ekstensi) > Apps Script
 * 5. Hapus semua kode default di Apps Script, lalu COPY & PASTE seluruh isi file ini.
 * 6. Klik tombol "Save" (ikon disket).
 * 7. Klik tombol biru "Deploy" (Terapkan) > "New deployment" (Penerapan baru).
 * 8. Klik ikon roda gigi (Select type) > Pilih "Web app".
 * 9. Konfigurasi:
 *    - Description: RSVP Halloween Receiver
 *    - Execute as: Me (email kamu)
 *    - Who has access: Anyone (Siapa saja)  <-- PENTING agar tamu bisa submit tanpa login Google
 * 10. Klik "Deploy". Jika diminta otorisasi, klik "Review Permissions" > Pilih akun > "Advanced" > "Go to ... (unsafe)" > "Allow".
 * 11. Copy "Web App URL" (akhiran /exec).
 * 12. Buka file `app.js` di project web kamu, lalu paste URL tersebut ke variabel:
 *     const GOOGLE_SCRIPT_URL = "URL_HASIL_DEPLOY_KAMU_DISINI";
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Tunggu maksimal 30 detik untuk menghindari tabrakan data jika disubmit bersamaan
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    // Tangani input baik dari JSON body maupun URL-encoded form data
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    var timestamp = new Date();
    var nama = data.nama || "-";
    var divisi = data.divisi || "-";
    var kehadiran = data.kehadiran || "-";
    var kostum = data.kostum || "-";
    var catatan = data.catatan || "-";

    // Tambahkan baris baru ke Google Sheet
    sheet.appendRow([timestamp, nama, divisi, kehadiran, kostum, catatan]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "RSVP berhasil dicatat di Google Sheets!",
        data: { nama: nama, kehadiran: kehadiran }
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

// Untuk cek apakah Web App aktif ketika diakses via browser langsung
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Halloween RSVP Google Apps Script Web App is running!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
