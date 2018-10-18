import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default class Cronometro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tempoCorrido: '00:00',
            rodando: false,
            iniciarTempo: null,
        };
    }

    transforma_segundos(segundos){
              
        function duas_casas(numero){
            if (numero <= 9){
                numero = "0"+numero;
            }
            return numero;
        }

        minuto = duas_casas(Math.floor((segundos%3600)/60));
        segundo = duas_casas((segundos%3600)%60);
                  
        formatado = minuto+":"+segundo;
                  
        return formatado;
    }

    iniciar() {
        if(this.state.rodando) {
            clearInterval(this.interval);

            this.setState({rodando: false});
            return;
        }

        var tempo = null;
        if(this.state.iniciarTempo != null){
            tempo = this.state.iniciarTempo;
        }

        this.interval = setInterval(() => {
            tempo = tempo + 1;

            cronometro = this.transforma_segundos(tempo);

            this.setState({
                tempoCorrido: cronometro,
                iniciarTempo: tempo,
                rodando: true
            });
        }, 1000);
    }

    zerar(){
        clearInterval(this.interval);

        this.setState({
            tempoCorrido: '00:00',
            iniciarTempo: null,
            rodando: false
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.tempoContainer}>
                        <Text style={styles.tempo}>
                            {this.state.tempoCorrido}
                        </Text>
                    </View>
                    <View style={styles.botaoContainer}>
                        <TouchableOpacity
                            onPress={this.iniciar.bind(this)}
                            style={[this.state.rodando ? styles.pausar : styles.iniciar, styles.botao]}
                        >
                            <Text style={styles.textoBranco}>
                            {this.state.rodando ? 'Pausar' : 'Iniciar'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={this.zerar.bind(this)}
                            style={[styles.pausar, styles.botao]}
                        >
                            <Text style={styles.textoBranco}>
                                Zerar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },

    header: {
        flex: 1
    },
    
    footer: {
        flex: 1
    },

    tempoContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    botaoContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    tempo: {
     fontSize: 60
    },

    botao: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    iniciar: {
        backgroundColor: '#2b9f13',
    },

    pausar: {
        backgroundColor: '#c32441',
    },

    textoBranco: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold'
    }
});
