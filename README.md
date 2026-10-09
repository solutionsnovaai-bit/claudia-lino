# Claudia Lino — Consórcio Embracon

Site estático (HTML + CSS + JS puro). Sem build, sem dependência.

## Estrutura

```
index.html
css/style.css
js/script.js
assets/
  ├── claudia-hero.jpg       ← foto do hero (quadrada, 1254 × 1254)
  ├── claudia-quem.jpg       ← foto da seção "Quem sou" (3:4, preto e branco)
  ├── simbolo-vermelho.png   ← mão Embracon, fundo transparente
  ├── simbolo-branco.png     ← versão branca
  └── mao-*-p1..p4.png       ← peças da mão (loader e persiana de modalidades)
```

## Deploy

1. Push pro GitHub
2. Vercel → Import repo → Framework: **Other** → Deploy

## Contatos — onde mudar

| O quê | Onde |
|---|---|
| WhatsApp | `js/script.js`, linha `var WPP = '5511999922926';` — muda em um lugar só, o script reescreve todos os links |
| Instagram | `index.html` — busque por `instagram.com/` (menu mobile, rodapé e balão flutuante) |
| Área de atendimento | rodapé, bloco "Contato" |
| Textos da seção "Quem sou" | `index.html`, `#quem` — os 3 princípios numerados |

## Cores da marca

- Vermelho Embracon: `#C90C10`
- Vermelho luminoso: `#FF2A31`
- Preto: `#111014`
- Off-white base: `#F4F1EA`

## Destaques da página

- **Persiana de modalidades**: 4 faixas verticais que expandem, cada uma
  carregando um dedo do logo como grafismo.
- **Curvas de custo**: dois caminhos em SVG que se desenham no scroll, com a
  área hachurada entre eles representando o que se paga a mais no financiamento.
- **Balões flutuantes**: Instagram e WhatsApp fixos no canto inferior direito.
