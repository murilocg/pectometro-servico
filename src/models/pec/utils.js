const stopWords = require('./stopWords.json');
const tratarTermoDeBusca = termo => {
  // termo = termo.toLocaleLowerCase();
  // termo = termo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  termo = termo.replace('pec', '');
  stopWords.forEach(word => {
    termo = termo.replace(`/${word}\b/g`, '');
  });
  return termo.trim();
};
const montarQuery = (url, filter) => {
  if (!filter) return url;
  url = url + '?';
  const keys = Object.keys(filter);
  keys.forEach((k, i) => (url += `${k}=${filter[k]}${i < keys.length - 1 ? '&' : ''}`));
  return url;
};

const parsePec = pec => ({
  id: pec.id,
  ano: pec.ano,
  ementa: pec.ementa,
  numero: pec.numero
});

const parseAutor = autor => ({
  id: autor.id,
  nome: autor.nome,
  tipo: autor.tipo
});

const parseComentarios = comentarios =>
  comentarios.map(c => ({
    id: c.id,
    texto: c.texto,
    createdAt: c.createdAt,
    cidadaoId: c.cidadao.id,
    nomeCidadao: c.cidadao.usuario.nome,
    sobrenomeCidadao: c.cidadao.usuario.sobrenome
  }));

const flat = arr => {
  const arr_result = [];
  arr.forEach(subArr => subArr.forEach(e => arr_result.push(e)));
  return arr_result;
};

const sleep = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

module.exports = {
  tratarTermoDeBusca,
  montarQuery,
  parseAutor,
  parsePec,
  flat,
  sleep,
  parseComentarios
};
