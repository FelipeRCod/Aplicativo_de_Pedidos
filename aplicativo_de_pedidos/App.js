import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';

const produtos = [
  { id: 'hamburguer', nome: 'Hambúrguer', preco: 25.0, imagem: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' },
  { id: 'pizza', nome: 'Pizza', preco: 40.0, imagem: 'https://cdn-icons-png.flaticon.com/512/3132/3132693.png' },
  { id: 'hotdog', nome: 'Hot Dog', preco: 15.0, imagem: 'https://cdn-icons-png.flaticon.com/512/1109/1109151.png' }
];

const bebidas = [
  { id: 'refrigerante', nome: 'Refrigerante', preco: 8.0, imagem: 'https://cdn-icons-png.flaticon.com/512/2405/2405479.png' },
  { id: 'suco', nome: 'Suco', preco: 10.0, imagem: 'https://cdn-icons-png.flaticon.com/512/3050/3050130.png' },
  { id: 'agua', nome: 'Água', preco: 5.0, imagem: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png' }
];

export default function App() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(produtos[0]);
  const [bebidaSelecionada, setBebidaSelecionada] = useState(bebidas[0]);
  const [listaPedidos, setListaPedidos] = useState([]);

  const valorTotal = produtoSelecionado.preco + bebidaSelecionada.preco;

  const confirmarPedido = () => {
    const novoPedido = {
      id: Date.now().toString(),
      produto: produtoSelecionado,
      bebida: bebidaSelecionada,
      total: valorTotal
    };
    
    setListaPedidos([...listaPedidos, novoPedido]);
    
    Alert.alert(
      "Pedido Confirmado",
      `Seu pedido foi adicionado à lista!\n\nTotal: R$ ${valorTotal.toFixed(2)}`,
      [{ text: "OK" }]
    );
  };

  const renderizarOpcoes = (itens, selecionado, setSelecionado) => (
    <View style={estilos.gridOpcoes}>
      {itens.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            estilos.card,
            selecionado.id === item.id && estilos.cardSelecionado
          ]}
          onPress={() => setSelecionado(item)}
        >
          <Image source={{ uri: item.imagem }} style={estilos.imagemCard} />
          <Text style={estilos.nomeCard}>{item.nome}</Text>
          <Text style={estilos.precoCard}>R$ {item.preco.toFixed(2)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={estilos.container}>
      <Text style={estilos.titulo}>Faça seu Pedido</Text>

      <View style={estilos.secao}>
        <Text style={estilos.label}>1. Escolha de produto:</Text>
        {renderizarOpcoes(produtos, produtoSelecionado, setProdutoSelecionado)}
      </View>

      <View style={estilos.secao}>
        <Text style={estilos.label}>2. Escolha de bebida:</Text>
        {renderizarOpcoes(bebidas, bebidaSelecionada, setBebidaSelecionada)}
      </View>

      <View style={estilos.containerResumo}>
        <Text style={estilos.textoResumo}>
          Pedido: {produtoSelecionado.nome} + {bebidaSelecionada.nome}
        </Text>
        <Text style={estilos.textoTotal}>
          Total: R$ {valorTotal.toFixed(2)}
        </Text>
      </View>

      <Button title="Confirmar pedido" onPress={confirmarPedido} color="#e63946" />

      {listaPedidos.length > 0 && (
        <View style={estilos.containerListaPedidos}>
          <Text style={estilos.tituloLista}>Pedidos Realizados</Text>
          {listaPedidos.map((pedido, index) => (
            <View key={pedido.id} style={estilos.itemListaPedido}>
              <Text style={estilos.textoItemPedido}>
                <Text style={{fontWeight: 'bold'}}>#{index + 1}</Text> - {pedido.produto.nome} + {pedido.bebida.nome}
              </Text>
              <Text style={estilos.textoTotalPedido}>R$ {pedido.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1d3557',
  },
  secao: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#457b9d',
  },
  gridOpcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '31%',
  },
  cardSelecionado: {
    borderColor: '#e63946',
    backgroundColor: '#fff0f1',
  },
  imagemCard: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  nomeCard: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1d3557',
    textAlign: 'center',
  },
  precoCard: {
    fontSize: 12,
    color: '#457b9d',
    marginTop: 4,
  },
  containerResumo: {
    padding: 15,
    backgroundColor: '#d8f3dc',
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b7e4c7',
  },
  textoResumo: {
    fontSize: 16,
    marginBottom: 8,
    color: '#2d6a4f',
    textAlign: 'center',
  },
  textoTotal: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1b4332',
  },
  containerListaPedidos: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1d3557',
    marginBottom: 15,
    textAlign: 'center',
  },
  itemListaPedido: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  textoItemPedido: {
    fontSize: 14,
    color: '#495057',
    flex: 1,
  },
  textoTotalPedido: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e63946',
  }
});