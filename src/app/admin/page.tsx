'use client'
import { useState, useEffect } from 'react';

interface Consulta {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string | null;
  asunto: string | null;
  mensaje: string;
  fecha: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkSession();
    
    // Verificar sesión periódicamente cada 5 minutos
    const interval = setInterval(() => {
      if (isLoggedIn) {
        checkSession();
      }
    }, 5 * 60 * 1000); // 5 minutos

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const checkSession = async () => {
    try {
      const response = await fetch('/api/consultas', {
        credentials: 'include' // Importante para enviar cookies
      });
      if (response.ok) {
        const data = await response.json();
        setConsultas(data.consultas || []);
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        setIsLoggedIn(false);
        setConsultas([]);
      }
    } catch (err) {
      // Solo desconectar si es un error de red real, no si es 401
      console.error('Error verificando sesión:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante para recibir cookies
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        // Recargar consultas
        const consultasResponse = await fetch('/api/consultas', {
          credentials: 'include' // Importante para enviar cookies
        });
        if (consultasResponse.ok) {
          const consultasData = await consultasResponse.json();
          setConsultas(consultasData.consultas || []);
        } else {
          setConsultas([]);
        }
      } else {
        setError(data.error || 'Error en el login');
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setConsultas([]);
        setUsername('');
        setPassword('');
        // Recargar la página para asegurar que se limpia todo
        window.location.href = '/admin';
      } else {
        // Si falla la API, aún así limpiar el estado local
        setIsLoggedIn(false);
        setConsultas([]);
        setUsername('');
        setPassword('');
        // Intentar eliminar cookie manualmente
        document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Si hay error, limpiar estado local y recargar
      setIsLoggedIn(false);
      setConsultas([]);
      setUsername('');
      setPassword('');
      document.cookie = 'admin_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/admin';
    }
  };

  const handleDeleteConsulta = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta consulta?')) {
      return;
    }

    try {
      const response = await fetch(`/api/consultas/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        // Eliminar de la lista local
        setConsultas(consultas.filter(c => c.id !== id));
      } else {
        const data = await response.json();
        alert(data.error || 'Error al eliminar la consulta');
      }
    } catch (error) {
      console.error('Error al eliminar consulta:', error);
      alert('Error de conexión al eliminar la consulta');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-darkmode">
        <div className="max-w-md w-full bg-white dark:bg-darklight p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6 text-midnight_text dark:text-white">
            Admin - SP Solutions
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-midnight_text dark:text-white">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-border dark:border-dark_border rounded-lg focus:border-primary dark:bg-darkmode dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-midnight_text dark:text-white">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border dark:border-dark_border rounded-lg focus:border-primary dark:bg-darkmode dark:text-white"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-darkmode p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-midnight_text dark:text-white">
            Consultas Recibidas
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>

        {!consultas || consultas.length === 0 ? (
          <div className="bg-white dark:bg-darklight p-8 rounded-lg shadow text-center">
            <p className="text-gray-500 dark:text-white/50">No hay consultas aún</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-darklight rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-dark_border">
                <thead className="bg-gray-50 dark:bg-darkmode">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                      Teléfono
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                      Asunto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                      Mensaje
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white/50 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-darklight divide-y divide-gray-200 dark:divide-dark_border">
                  {consultas && consultas.map((consulta) => (
                    <tr key={consulta.id} className="hover:bg-gray-50 dark:hover:bg-darkmode">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(consulta.fecha).toLocaleString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {consulta.nombre} {consulta.apellido}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {consulta.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {consulta.telefono || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {consulta.asunto || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-xs truncate">
                        {consulta.mensaje || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <button
                          onClick={() => handleDeleteConsulta(consulta.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Eliminar consulta"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

