import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text
} from "react-native";
// componentes importados para a estruturação do aplicativo
import Header from "../componentes/estruturais/Header.componente.js";
// estilizações importadas
import {
  ViewCentralCorpoDoAPP,
  ViewPrincipal,
} from "../estilos/EstilosEstruturais.estilos.js";
import Footer from "../componentes/estruturais/Footer.componente.js";
// não remover status bar, para manter header bonito
// importando hook
import { useState, useEffect } from "react";
// importando o menu que vai aparecer ao clicar
import Menu from "../componentes/estruturais/Menu.componente.js";
// importando para a navegação
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
// importando as unidades responsivas do css
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// componentes importados
import CapaDoFilme from "../componentes/estruturais/CapaDoFilme.componente.js";
// fontes de texto
import H3 from "../componentes/textos/h3.componente.js";
// para api
import axios from "axios";

export default function Inicio() {
  const [filmesRecebidosDaAPI, setFilmesRecebidosDaAPI] = useState([]);
  const [TodosOsFilmes, setTodosOsFilmes] = useState([]);

  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const Chave_API = `6cddfd47f161d361d208a3c89d527390`;
  const TokenDaApi = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2RkZmQ0N2YxNjFkMzYxZDIwOGEzYzg5ZDUyNzM5MCIsIm5iZiI6MTcyNzI3MTEyOS43NjgyNjYsInN1YiI6IjY2ZjNmZWJjMzM4MzU3YzcwYTY5ZmFkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BoGiGtV6Uq5vT7Nm2IaQsjV3OIILCfCXmLHp_0TRO0A";
  const BuscarFilmes = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${Chave_API}&language=pt-BR`
      );
      
      
      setFilmesRecebidosDaAPI(response.data.results); // Ajuste aqui para acessar os resultados
      
      setError("");
      console.log("Deu certo a API!");
    } catch (err) { 
      setError("Erro ao buscar os filmes.");
      console.error(err);
    }
  };

  useEffect(() => {
    SelecionarFilmesDoGenero(setGuerra, 10752);     // Guerra
  SelecionarFilmesDoGenero(setAcao, 28);          // Ação
  SelecionarFilmesDoGenero(setDrama, 18);         // Drama
  SelecionarFilmesDoGenero(setComedia, 35);       // Comédia
  SelecionarFilmesDoGenero(setTerror, 27);        // Terror
  SelecionarFilmesDoGenero(setAventura, 12);      // Aventura
  SelecionarFilmesDoGenero(setRomance, 10749);    // Romance
  SelecionarFilmesDoGenero(setFantasia, 14);      // Fantasia
  SelecionarFilmesDoGenero(setSciFi, 878);        // Ficção Científica
  SelecionarFilmesDoGenero(setDocumentario, 99);  // Documentário
  SelecionarFilmesDoGenero(setAnimacao, 16);      // Animação
  SelecionarFilmesDoGenero(setMusical, 10402);    // Musical
  SelecionarFilmesDoGenero(setHistorico, 36);     // História
  SelecionarFilmesDoGenero(setCrime, 80);         // Crime
  SelecionarFilmesDoGenero(setMisterio, 9648);    // Mistério
  SelecionarFilmesDoGenero(setThriller, 53);      // Thriller   // TV Movie
  SelecionarFilmesDoGenero(setFamilia, 10751);    // Família
      BuscarFilmes();
    
  }, []); // Atualiza a busca quando searchTerm muda

  const Drawer = createDrawerNavigator();
  const navigation = useNavigation();
  const [visibilidadeModal, setandoVisibilidadeModal] = useState(false);
  //generos
  const [guerra, setGuerra] = useState([]);
const [acao, setAcao] = useState([]);
const [drama, setDrama] = useState([]);
const [comedia, setComedia] = useState([]);
const [terror, setTerror] = useState([]);
const [aventura, setAventura] = useState([]);
const [romance, setRomance] = useState([]);
const [fantasia, setFantasia] = useState([]);
const [sciFi, setSciFi] = useState([]);
const [documentario, setDocumentario] = useState([]);
const [animacao, setAnimacao] = useState([]);
const [musical, setMusical] = useState([]);
const [historico, setHistorico] = useState([]);
const [crime, setCrime] = useState([]);
const [misterio, setMisterio] = useState([]);
const [thriller, setThriller] = useState([]);
const [familia, setFamilia] = useState([]);
  // IDs de gêneros de exemplo (substitua pelos IDs reais)
  const warGenreId = 10752; // Exemplo de ID para Guerra
  const actionGenreId = 28; // Exemplo de ID para Ação
  const filmesFiltrados = (generoEscolhido) => {
    return TodosOsFilmes.filter((filme) => {
      return Array.isArray(filme.genres) &&
             filme.genres.some(genre => genre.id === generoEscolhido);
    });
  };
  const SelecionarFilmesDoGenero = async (variavelAsetar, idDoGenero) =>{
    try {
      const FilmesGeral = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Chave_API}&language=pt-BR&with_genres=${idDoGenero}`
      );
      variavelAsetar(FilmesGeral.data.results);      
      setError("");
      console.log("Deu certo a API!");
      return resultado;
    } catch (err) { 
      setError("Erro ao buscar os filmes.");
      console.error(err);
    }
  }
  const resultado = SelecionarFilmesDoGenero(warGenreId);
  return (
    <View style={ViewPrincipal.estilo}>
      {/* Não remover STATUS BAR!!!!!!!!!!!!! */}
      <StatusBar backgroundColor={"#000000"} />
      <Header ativarMenuTrueFalse={() => navigation.openDrawer()} />
      {/* Flat list para carregar toda a página home */}
      <View style={ViewCentralCorpoDoAPP.estilo}>
        <ScrollView>
          {/* Primeira View com os lançamentos */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Populares"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={filmesRecebidosDaAPI}
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={""}
                  />
                </View>
              )}
            />
          </View>
          {/* Seção de Gêneros */}
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Guerra"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={
                guerra
              } // Filtra os filmes por gênero de Guerra
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={
                      item.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : 'https://img.freepik.com/fotos-gratis/conceito-de-fundo-do-estudio-abstrato-vazio-claro-gradiente-roxo-fundo-do-quarto-do-estudio-para-o-produto_1258-54682.jpg' // Coloque uma imagem padrão aqui
                    }
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>

          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Ação"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={acao} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Drama"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={drama} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Comédia"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={comedia} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Terror"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={terror} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"romance"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={romance} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Fantasia"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={fantasia} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Aventura"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={aventura} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Documentário"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={documentario} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Ficção Científica"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={sciFi} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Animação"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={animacao} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
            
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Musical"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={musical} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
            
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Histórico"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={historico} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
            
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Crime"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={crime} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
            
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Mistério"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={misterio} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View>
              )}
            />
            
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Thriller"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={thriller} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View> 
              )}
            />
            
          </View>
          <View style={EstilosDoInicio.ViewPrimariaQueCarregaOblocoDeLançamentos}>
            <H3 texto={"Família"} />
            <FlatList
              style={EstilosDoInicio.EstilizacaoDaFlatList}
              data={familia} // Filtra os filmes por gênero de Ação
              keyExtractor={(item) => item.id.toString()}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={EstilosDoInicio.ViewQueSeguraInternamenteAflatList}>
                  <CapaDoFilme
                    propriedadeParaReceberAcapaDoFilme={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    tamonhoMenorOuMaiorrStingVazia={"Menor"}
                  />
                </View> 
              )}
            />
            
          </View>
        </ScrollView>
      </View> 
    </View>
  );
}

const EstilosDoInicio = StyleSheet.create({
  ViewPrimariaQueCarregaOblocoDeLançamentos: {
    flex: 3,
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: "#1A1A1A",
    justifyContent: "center",
  },
  EstilizacaoDaFlatList: {
    flex: 2,
    marginTop: 20,
  },
  ViewQueSeguraInternamenteAflatList: {
    flex: 2,
  },
});
