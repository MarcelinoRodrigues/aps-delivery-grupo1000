function autenticar(usuarios, email, senha) {
  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) return false;
  return usuario.ativo === true && usuario.senha === senha;
}

function forcaSenha(senha) {
  if (senha === undefined || senha === null || senha.length < 8) return 'fraca';

  const tipos = new Set();

  if (/[a-z]/.test(senha)) tipos.add('minusc');
  if (/[A-Z]/.test(senha)) tipos.add('maiusc');
  if (/\d/.test(senha)) tipos.add('digito');
  if (/[^A-Za-z0-9]/.test(senha)) tipos.add('simbolo');

  const criteriosAdotados = tipos.size;

  if (criteriosAdotados >= 3) return 'forte';
  return 'media';
}

function podeLogar(usuario) {
  let acessoAoLogar = usuario.status === 'ativo' && usuario.falhas < 3;
  return acessoAoLogar;
}

function calcularFrete(distanciaKm) {
  if (distanciaKm <= 0) {
    throw new Error('Distância inválida');
  }

  if (distanciaKm <= 3) return 5;
  return 5 + (distanciaKm - 3) * 1.5;
}

function aplicarCupom(valor, cupom) {
  if (cupom === null || cupom === undefined || cupom === '') {
    return valor;
  }

  if (cupom === 'PRIMEIRA10') {
    return Number((valor * 0.9).toFixed(2));
  }

  if (cupom === 'VIP20') {
    return Number((valor * 0.8).toFixed(2));
  }

  throw new Error('Cupom inválido');
}

module.exports = { autenticar, forcaSenha, podeLogar, calcularFrete, aplicarCupom };
