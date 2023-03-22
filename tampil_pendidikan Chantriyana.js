app.post("/api/tampil_pendidikan", (req, res) => {
    console.log("Tampil pendidikan");
    let data = {
      token: req.body.token,
      jam_request: PublikFungsi.WaktuSekarang("DD-MM-YYYY HH:mm:ss") + " Wib.",
    };
    let sql;
    let nama_tabel = 'tb_pendidikan';
    let nama_field = '*';
    let kondisi = 'ORDER BY kd_pendidikan ASC';
    try {
      sql = PublikFungsi.CariDataDebug(
        nama_tabel,
        nama_field,
        kondisi
      );
    } catch (error) {
      sql = PublikFungsi.CariDataDebug(
        nama_tabel,
        nama_field,
        kondisi
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
                pesan: "Error.",
                status_tampil: false,
                tokennyaa: "Hidden",
                error: err,
                jumlah_data: 0,
                data: results,
              })
            );
          } else {
            if (results.length > 0) {
              res.send(
                JSON.stringify({
                  status: 200,
                  pesan: "Datanya ada.",
                  status_tampil: true,
                  tokennyaa: "Hidden",
                  error: null,
                  jumlah_data: results.length,
                  data: results,
                })
              );
            } else {
              res.send(
                JSON.stringify({
                  status: 200,
                  pesan: "Belum Ada datanya.",
                  status_tampil: false,
                  tokennyaa: "Hidden",
                  error: null,
                  jumlah_data: results.length,
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
            status_tampil: false,
            tokennyaa: data["token"],
            error: null,
            jumlah_data: 0,
            data: [],
          })
        );
      }
    } else {
      res.send(
        JSON.stringify({
          status: 200,
          pesan: "Inputan Kurang !",
          status_tampil: false,
          tokennyaa: data["token"],
          error: null,
          jumlah_data: 0,
          data: [],
        })
      );
    }
    console.log(data);
  });