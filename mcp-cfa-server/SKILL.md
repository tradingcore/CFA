# CFA Knowledge MCP Server

MCP server que centraliza todo o conhecimento CFA para o Trading Core. É o cérebro da IA — dados, exercícios, fórmulas, e regras de comportamento.

## Quando usar

Use este MCP sempre que precisar responder sobre CFA, gerar questões, explicar conceitos, ou criar planos de estudo. Todas as respostas devem ser baseadas exclusivamente nos dados deste server — não use conhecimento externo.

## Tools disponíveis

| Tool | Input | O que faz |
|------|-------|-----------|
| `search_concepts` | query, level, topicId?, moduleId? | Busca conceitos no currículo por keyword. Retorna LOS com resumo e conceitos-chave. |
| `get_exercises` | level, topicId?, moduleId?, losId?, difficulty?, count | Retorna questões MCQ filtradas com opções, resposta correta e explicação. |
| `get_formulas` | level, topicId?, moduleId?, query? | Retorna fórmulas em LaTeX com descrição, variáveis e exemplo numérico. |
| `get_los_detail` | losId, level | Detalhe completo de um LOS: resumo, conceitos, fórmulas relacionadas, exercícios de exemplo. |
| `search_docs` | query, limit? | Busca nos 244 documentos markdown (Schweser Notes, QBank, Mocks, Formula Sheet) por keyword. |
| `list_docs` | (nenhum) | Lista todos os documentos indexados na knowledge base. |

## Knowledge Base

### Documentos (244 total, 14MB)

- **Level I**: 6 Schweser Books + Formula Sheet + Secret Sauce + 201 QBank readings + 12 Kaplan Mocks + 13 AnalystPrep Notes
- **Level II**: 5 Schweser Books (Quant/Econ, FSA/Corp, Equity, FI/Deriv/Alts, PM/Ethics)
- **Level III**: 6 Schweser Books (Asset Allocation, Portfolio Construction, Deriv/Risk/Ethics, PM, Private Markets, Private Wealth)

Ver `docs/INDEX.md` para o mapeamento completo.

### Currículo estruturado

- 1006 LOS parseados (365 L1 + 370 L2 + 271 L3) em `src/data/curriculum/`
- Cada LOS com: losId, número (1.1.a), tópico, módulo, descrição, resumo, conceitos-chave

### Fórmulas

22 fórmulas essenciais em LaTeX em `src/data/formulas/formulas.json`: PV, FV, HPR, Geometric Mean, Bayes, Portfolio Variance, CAPM, Sharpe, Duration, DV01, Convexity, Gordon Growth, Put-Call Parity, DuPont, WACC, etc.

### Exercícios

Banco em `src/data/exercises/` com questões mapeadas por tópico, módulo e LOS.

## Comportamento da IA

Definido em `docs/system/ai-behavior.md`. Este arquivo controla:

- **Persona**: Trading Core, tutor CFA expert
- **Princípios**: citar LOS, fórmula antes de calcular, step-by-step, analogias, ética CFA
- **Formato**: Markdown, LaTeX KaTeX, headings ###
- **Regras por modo**: chat, geração de questões, explicação de erros, plano de estudos

Para mudar o comportamento da IA, edite apenas `docs/system/ai-behavior.md`.

## Adicionar novos documentos

```bash
# 1. Configurar Mistral API key (uma vez)
echo 'MISTRAL_API_KEY=your-key' > .env

# 2. Converter PDFs para markdown
python3 scripts/convert_pdfs.py "path/to/file.pdf" --category level-1/books

# 3. Verificar
python3 scripts/sanitize_latex.py docs/level-1/books/slug.md
```

Categorias: `level-1/books`, `level-1/qbank`, `level-1/mocks`, `level-2/books`, `level-3/books`, `system`

## Gerar exercícios em batch

```bash
OPENAI_API_KEY=sk-... npx tsx scripts/generate-exercises.ts --level I --count 10
OPENAI_API_KEY=sk-... npx tsx scripts/generate-exercises.ts --level I --topic quant --count 20
```

## Conectar no Cursor

Adicione em `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "cfa-knowledge": {
      "command": "node",
      "args": ["mcp-cfa-server/dist/index.js"]
    }
  }
}
```
