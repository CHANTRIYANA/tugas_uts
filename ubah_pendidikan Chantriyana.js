app.post("/api/ubah_pendidikan", (req, res) => {
    console.log("Ubah pendidikan");
    let data = {
      token: req.body.token,
      kd_pendidikan : req.body.kd_pendidikan,
      nama_instansi: req.body.nama_instansi,
      range_tahun : req.body.range_tahun,
      jurusan : req.body.jurusan,
      jam_request: PublikFungsi.WaktuSekarang("DD-MM-YYYY HH:mm:ss") + " Wib.",
    };
    let sql;
    let nama_tabel = 'tb_pendidikan';
    let nama_field = 'kd_pendidikan,nama_instansi,range_tahun,jurusan';
    let value_field = '"' + data.kd_pendidikan + '",';
    value_field += '"' + data.nama_instansi + '",';
    value_field += '"' + data.range_tahun + '",';
    value_field += '"' + data.jurusan + '"';
  
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
                pesan: "Error Code ubah pendidikan.",
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
                  pesan: "ubah pendidikan Sukses.",
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
                  pesan: "ubah pendidikan Error.",
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