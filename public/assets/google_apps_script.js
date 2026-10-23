/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - VISKAL HALLOWEEN RSVP WEB APP HANDLER
 * =========================================================================
 * Cara Setup (Hanya butuh 2 Menit):
 * 1. Buka Google Sheets baru di https://sheets.new
 * 2. Beri nama spreadsheet, misal: "RSVP Viskal Halloween 2026"
 * 3. Di baris pertama (Row 1), buat 4 kolom berikut:
 *    A1: Timestamp
 *    B1: Nama Lengkap
 *    C1: Status Kehadiran
 *    D1: Alasan (Jika Tidak Ikut)
 * 4. Klik menu: Extensions (Ekstensi) > Apps Script
 * 5. Hapus semua kode default di Apps Script, lalu COPY & PASTE seluruh isi file ini.
 * 6. Klik tombol "Save" (ikon disket).
 * 7. Klik tombol biru "Deploy" (Terapkan) > "New deployment" (Penerapan baru).
 * 8. Klik ikon roda gigi (Select type) > Pilih "Web app".
 * 9. Konfigurasi:
 *    - Description: RSVP Halloween Receiver
 *    - Execute as: Me (email kamu)
 *    - Who has access: Anyone (Siapa saja)  <-- WAJIB agar tamu bisa kirim RSVP tanpa login akun Google
 * 10. Klik "Deploy". Jika diminta otorisasi, klik "Review Permissions" > Pilih akun Google Anda > "Advanced" > "Go to ... (unsafe)" > "Allow".
 * 11. Salin "Web App URL" (yang memiliki akhiran /exec).
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = {};

    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    // Format timestamp
    var timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
    var nama = data.nama || "-";
    var kehadiran = data.kehadiran || "-";
    var isAttending = (data.kehadiran === "Ikut" || data.kehadiran === "Yes" || data.kehadiran === "Attending");
    var alasan = isAttending ? "-" : (data.alasan || data.kostum || "-");

    // Save row: Timestamp, Name, Attendance, Reason
    sheet.appendRow([timestamp, nama, kehadiran, alasan]);

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

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "active",
      message: "Viskal Halloween RSVP Web App is active!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
