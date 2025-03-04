import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { BaseCommand } from '@adonisjs/core/ace'

export default class PatchZodTypes extends BaseCommand {
  public static commandName = 'patch:zod-types'
  public static description = 'Patch generated types to use Zod instead of VineJS'

  public async run() {
    // Obtenha o diretório atual usando import.meta.url
    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    // Caminho para o arquivo gerado pelo Tuyau
    const filePath = path.join(__dirname, '../.adonisjs/api.ts')

    // Verifique se o arquivo existe
    if (!fs.existsSync(filePath)) {
      this.logger.error(
        'Arquivo .adonisjs/api.ts não encontrado. Execute o comando tuyau:generate primeiro.'
      )
      return
    }

    // Leia o conteúdo do arquivo
    let content = fs.readFileSync(filePath, 'utf-8')

    // Substitua a importação do VineJS pela importação do Zod
    content = content.replace(
      /import type { InferInput } from '@vinejs\/vine\/types'/,
      "import { z } from 'zod'"
    )

    // Substitua InferInput por z.infer
    content = content.replace(/InferInput/g, 'z.infer')

    // Escreva o conteúdo modificado de volta no arquivo
    fs.writeFileSync(filePath, content)

    this.logger.success('Arquivo .adonisjs/api.ts atualizado com sucesso!')
  }
}
