import { spawn } from "child_process"
import ScanModel from "@/api/db/model/ScanModel"
import mw from "@/api/mw"

const scanIp = async (optionAnalyse, option, time, number, port, ip) => {
  return new Promise((resolve, reject) => {
    try {
      const nmap = spawn("nmap", [
        optionAnalyse,
        option,
        time,
        number,
        port,
        ip,
      ])
      let stdout = ""

      nmap.stdout.on("data", (data) => {
        stdout += data.toString()
      })

      nmap.stderr.on("data", () => {
        return
      })

      nmap.on("close", (code) => {
        if (code !== 0) {
          reject(new Error(`Nmap exited with code ${code}`))
        } else {
          resolve(stdout)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

const handler = mw({
  POST: [
    async (req, res) => {
      const { uidUser, optionAnalyse, option, time, number, port, ip } =
        req.body

      let t = ""

      if (time != null && time != "") {
        t = time + "s"
      }

      let p = ""

      if (port != null && port != "") {
        p = "-p" + port
      }

      const result = await scanIp(optionAnalyse, option, t, number, p, ip)
      await ScanModel.create({
        uidUser,
        date: new Date(),
        optionAnalyse,
        option,
        t,
        number,
        p,
        ip,
        result,
      })
      res.send({ result: result })
    },
  ],
  GET: [
    async (req, res) => {
      const { identifiant } = req.query
      const stock = await ScanModel.find({
        uidUser: { $eq: identifiant },
      })
      res.send({ result: stock })
    },
  ],
})

export default handler
