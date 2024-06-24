import AgroData from '../data/Manufac _ India Agro Dataset.json';
import { Table, TableProps } from '@mantine/core';

const DisplayTable = () => {
  const minMaxProduction: { [year: string]: YearlyData } = {};
  const yieldAreaPerCrop: { [crop: string]: CropData } = {};

  AgroData.forEach((record: any) => {
    const year = record.Year.slice(-4);
    if (!minMaxProduction[year]) {
      minMaxProduction[year] = {
        max: { CropName: record.CropName, Production: record.CropProduction },
        min: { CropName: record.CropName, Production: record.CropProduction }
      };
    } else {
      if (record.CropProduction > minMaxProduction[year].max.Production!) {
        minMaxProduction[year].max = {
          CropName: record.CropName,
          Production: record.CropProduction !== '' ? record.CropProduction : 0
        };
      }
      if (record.CropProduction < minMaxProduction[year].min.Production!) {
        minMaxProduction[year].min = {
          CropName: record.CropName,
          Production: record.CropProduction !== '' ? record.CropProduction : 0
        };
      }
    }
  });

  AgroData.forEach((record: any) => {
    if (!yieldAreaPerCrop[record.CropName]) {
      yieldAreaPerCrop[record.CropName] = { totalYield: 0, totalArea: 0 };
    }
    yieldAreaPerCrop[record.CropName].totalYield += record.Yield !== '' ? record.Yield : 0;
    yieldAreaPerCrop[record.CropName].totalArea += record.AreaUnderCultivation !== '' ? record.AreaUnderCultivation : 0;
  });

  const ProductionAnalysisTable = ({ striped, highlightOnHover, withTableBorder }:TableProps) => (
    <Table striped={striped} highlightOnHover={highlightOnHover} withTableBorder={withTableBorder}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with maximum production in that year</Table.Th>
          <Table.Th>Crop with minimum production in that year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.keys(minMaxProduction).map((year) => (
          <Table.Tr key={year}>
            <Table.Td>{year}</Table.Td>
            <Table.Td>{minMaxProduction[year].max.CropName}</Table.Td>
            <Table.Td>{minMaxProduction[year].min.CropName}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
  const YieldAnalysisTable = ({ striped, highlightOnHover, withTableBorder }:TableProps) => (
    <Table striped={striped} highlightOnHover={highlightOnHover} withTableBorder={withTableBorder}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
          <Table.Th>Average Cultivation Area of the Crop between 1950-2020</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.keys(yieldAreaPerCrop).map((CropName) => (
          <Table.Tr key={CropName}>
            <Table.Td>{CropName}</Table.Td>
            <Table.Td>{Math.round((yieldAreaPerCrop[CropName].totalYield / 70) * 1000) / 1000}</Table.Td>
            <Table.Td>{Math.round((yieldAreaPerCrop[CropName].totalArea / 70) * 1000) / 1000}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '35vw' }}>
            <h3>Crops with maximum and minimum production from 1950-2020</h3>
            <ProductionAnalysisTable striped highlightOnHover withTableBorder/>
        </div>
        <div style={{ width: '40vw'}}>
            <h3>Average yield on average cultivation land size of crops from 1950-2020</h3>
            <YieldAnalysisTable striped highlightOnHover withTableBorder/>
        </div>
    </div>
  );
};

export default DisplayTable;
