const stopWords = require('./stopWords.json');
const tratarTermoDeBusca = termo => {
  termo = termo ? termo : '';
  termo = termo.toLocaleLowerCase();
  termo = termo.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
    cidadaoId: c.usuario.id,
    nomeCidadao: c.usuario.nome,
    sobrenomeCidadao: c.usuario.sobrenome
  }));

const flat = arr => {
  const arr_result = [];
  arr.forEach(subArr => subArr.forEach(e => arr_result.push(e)));
  return arr_result;
};

const hashPec = arr => {
  const hash = {};
  arr.forEach(p => (hash[p.id] = p.id));
  return hash;
};

const hashAutor = arr => {
  const hash = {};
  arr.forEach(a => (hash[a.nome] = a));
  return hash;
};

const getIdDeputado = uri => {
  const index = uri.lastIndexOf('/');
  if (index === -1) return 0;
  const id = Number(uri.slice(index + 1));
  return id ? id : 0;
};

const sleep = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};

const concat = (arr, matriz) => {
  matriz.forEach(subArr => subArr.forEach(e => arr.push(e)));
  return arr;
};

const getSlicePecIds = (pecIds, max, tamanho, i) => {
  const start = i * tamanho;
  if (i === max - 1) return pecIds.slice(start);
  else return pecIds.slice(start, start + tamanho);
};

const formatarData = data => {
  if (!data) return '';
  return data
    .toISOString()
    .split(' ')[0]
    .replace('/-/g', '/');
};

const getAllElements = async (start, end, load) => {
  const elements = [];
  let count = start;
  let dados = [];
  do {
    dados = await load(count);
    dados.forEach(e => elements.push(e));
    count++;
  } while (count <= end);
  return elements;
};

const precisaAtualizar = dataSincronizacao => {
  const dataExpiracao = new Date(dataSincronizacao.getTime());
  dataExpiracao.setDate(dataExpiracao.getDate() + 1);
  return dataExpiracao < dataSincronizacao;
};

module.exports = {
  tratarTermoDeBusca,
  montarQuery,
  parseAutor,
  parsePec,
  flat,
  sleep,
  parseComentarios,
  hashPec,
  hashAutor,
  getIdDeputado,
  concat,
  getSlicePecIds,
  formatarData,
  getAllElements,
  precisaAtualizar
};
