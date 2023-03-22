app.post("/api/ubah_pengalaman", (req, res) => {
    console.log("Ubah pengalaman");
    let data = {
      token: req.body.token,
      kd_pengalaman : req.body.kd_pengalaman,
      nama_instansi: req.body.nama_instansi,
      jabatan_terakhir : req.body.jabatan_terakhir,
      terakhir_bekerja : req.body.terakhir_bekerja,
      jam_request: PublikFungsi.WaktuSekarang("DD-MM-YYYY HH:mm:ss") + " Wib.",
    };
    let sql;
    let nama_tabel = 'tb_pengalaman_kerja';
    let nama_field = 'kd_pengalaman,nama_instansi,jabatan_terakhir,terakhir_bekerja';
    let value_field = '"' + data.kd_pengalaman + '",';
    value_field += '"' + data.nama_instansi + '",';
    value_field += '"' + data.jabatan_terakhir + '",';
    value_field += '"' + data.terakhir_bekerja + '"';
  
    try {
      sql = PublikFungsi.SimpanSingleDebug(
        nama_tabel,
        nama_field,
        value_field
      );
    } catch (error) {
      sql = PublikFungsi.SimpanSingleDebug(
        nama_tabel,
        nama_field,
        value_field
      );
      console.log('Erorr Sistem : ' + error);
    }
    res.setHeader("Content-Type", "application/json");
    if (data["token"]) {
      if (Token.LoginToken(data["token"])) {
        hendelKoneksi();
        conn.query(sql, data, (err, results) => {
          if (err) {
            res.send(
              JSON.stringify({
                status: 200,
                pesan: "Error Code ubah pengalaman.",
                status_ubah: false,
                tokennyaa: "Hidden",
                error: err,
                data: results,
              })
            );
          } else {
            let affectedRows = results.affectedRows;
            if (affectedRows = 1) {
              res.send(
                JSON.stringify({
                  status: 200,
                  pesan: "ubah pengalaman Sukses.",
                  status_ubah: true,
                  tokennyaa: "Hidden",
                  error: null,
                  data: results,
                })
              );
            } else {
              res.send(
                JSON.stringify({
                  status: 200,
                  pesan: "ubah pengalaman Error.",
                  status_ubah: false,
                  tokennyaa: "Hidden",
                  error: null,
                  data: results,
                })
              );
            }
          }
        });
        conn.end();
        console.log("Putuskan MySQL/MariaDB...");
      } else {
        res.send(
          JSON.stringify({
            status: 200,
            pesan: "Token Tidak Sesuai !",
            status_ubah: false,
            tokennyaa: data["token"],
            error: null,
            data: [],
          })
        );
      }
    } else {
      res.send(
        JSON.stringify({
          status: 200,
          pesan: "Inputan Kurang !",
          status_ubah: false,
          tokennyaa: data["token"],
          error: null,
          data: [],
        })
      );
    }
    console.log(data);
  });