using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            try
            {
                return await _context.Employees.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Error fetching all employees", ex);
            }
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Employees.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error fetching employee with ID {id}", ex);
            }
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            try
            {
                _context.Employees.Add(employee);
                await _context.SaveChangesAsync();
                return employee;
            }
            catch (Exception ex)
            {
                throw new Exception("Unexpected error adding new employee", ex);
            }
        }

        public async Task UpdateAsync(Employee employee)
        {
            try
            {
                _context.Employees.Update(employee);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Unexpected error updating employee with ID {employee.Id}", ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var employee = await _context.Employees.FindAsync(id);
                if (employee != null)
                {
                    _context.Employees.Remove(employee);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception($"Employee with ID {id} not found");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Unexpected error deleting employee with ID {id}", ex);
            }
        }
    }
}
