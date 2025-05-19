
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  countries, 
  services, 
  years, 
  months, 
  clients, 
  executives, 
  getMonthName 
} from '../data/mockData';
import { FilterState } from '../utils/filterUtils';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  showClientFilter?: boolean;
  showExecutiveFilter?: boolean;
}

const FilterBar = ({ 
  filters, 
  setFilters, 
  showClientFilter = false, 
  showExecutiveFilter = false 
}: FilterBarProps) => {
  
  const handleFilterChange = (field: keyof FilterState, value: string | number) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">País</label>
        <Select
          value={filters.country}
          onValueChange={(value) => handleFilterChange('country', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar país" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Servicio</label>
        <Select
          value={filters.service}
          onValueChange={(value) => handleFilterChange('service', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar servicio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            {services.map((service) => (
              <SelectItem key={service} value={service}>{service}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Año</label>
        <Select
          value={filters.year.toString()}
          onValueChange={(value) => handleFilterChange('year', parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar año" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-sm font-medium mb-1 block">Mes</label>
        <Select
          value={filters.month.toString()}
          onValueChange={(value) => handleFilterChange('month', parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar mes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Todos</SelectItem>
            {months.map((month) => (
              <SelectItem key={month} value={month.toString()}>{getMonthName(month)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {showClientFilter && (
        <div className="w-full md:w-auto">
          <label className="text-sm font-medium mb-1 block">Cliente</label>
          <Select
            value={filters.client || 'Todos'}
            onValueChange={(value) => handleFilterChange('client', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {clients.map((client) => (
                <SelectItem key={client} value={client}>{client}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      
      {showExecutiveFilter && (
        <div className="w-full md:w-auto">
          <label className="text-sm font-medium mb-1 block">Ejecutiva</label>
          <Select
            value={filters.executive || 'Todos'}
            onValueChange={(value) => handleFilterChange('executive', value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar ejecutiva" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos</SelectItem>
              {executives.map((executive) => (
                <SelectItem key={executive} value={executive}>{executive}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
