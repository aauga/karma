﻿using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using MySql.Data.MySqlClient;

namespace karma.Data
{
    public class DataAccess
    {
        public async Task<List<T>> LoadData<T, TU>(string sql, TU parameters, string connectionString)
        {
            using IDbConnection connection = new MySqlConnection(connectionString);
            var rows = await connection.QueryAsync<T>(sql, parameters);

            return rows.ToList();
        }
    }
}