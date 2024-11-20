import React from 'react';
import { Text, View } from 'react-native';
import BottomBar from '../../components/bottomBar';
import styles from './style';
import StockManagement from '../../components/components_ADM/estoque';
import Accordion from 'react-native-collapsible/Accordion';

const AdministrationFunctions = () => {
    const SECTIONS = [
        {
          title: 'First',
          content: 'Lorem ipsum...',
        },
        {
          title: 'Second',
          content: 'Lorem ipsum...',
        },
      ];
    return (
        <View style={styles.container}>
            <View style={styles.functionContainer}>
                <Text style={{ color: 'white' }}>Pagina administrador</Text>
                {/* <Accordion
                    sections={SECTIONS}
                    activeSections={this.state.activeSections}
                    renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                /> */}
                <StockManagement></StockManagement>
            </View>
            <BottomBar />
        </View>
    );
};

export default AdministrationFunctions;