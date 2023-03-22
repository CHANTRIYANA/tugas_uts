app.post("/api/hapus_pendidikan", (req, res) => {
    console.log("Hapus pendidikan");
    let data = {
      token: req.body.token,
      kd_pendidikan : req.body.kd_pendidikan,
      jam_request: PublikFungsi.WaktuSekarang("DD-MM-YYYY HH:mm:ss") + " Wib.",
    };
    let sql;
    let nama_tabel = 'tb_pendidikan';
    let kondisi = 'kd_pendidikan = "' + data.kd_pendidikan + '"';
  
    try {
      sql = PublikFungsi.HapusDebug(
        nama_tabel,
        kondisi
      );
    } catch (error) {
      sql = PublikFungsi.HapusDebug(
        nama_tabel,
        kondisi
      );
      console.log(error);
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
                pesan: "Error Code Hapus pendidikan.",
                status_hapus: false,
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
                  pesan: "Hapus pendidikan Sukses.",
                  status_hapus: true,
                  tokennyaa: "Hidden",
                  error: null,
                  data: results,
                })
              );
            } else {
              res.send(
                JSON.stringify({
                  status: 200,
                  pesan: "Hapus pendidikan Error.",
                  status_hapus: false,
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
            status_hapus: false,
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
          status_hapus: false,
          tokennyaa: data["token"],
          error: null,
          data: [],
        })
      );
    }
    console.log(data);
  });