const API_BASE_URL = 'https://v2.api.noroff.dev';

/**
 * Common API configuration and utilities
 */
const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Get authorization headers with access token
 * @returns {Object} Headers object with authorization
 */
export function getAuthHeaders() {
  const token = localStorage.getItem('accessToken');
  return {
    ...apiConfig.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

/**
 * Handle API response and throw error if not ok
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} Parsed JSON data
 * @throws {Error} If response is not ok
 */
async function handleApiResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || 'API request failed');
  }
  
  return data;
}

/**
 * Login user with email and password
 * @async
 * @param {Object} credentials - The login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * @returns {Promise<Object>} User data and access token
 * @throws {Error} If login fails
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login?_holidaze=true`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({ email, password }),
  });

  return handleApiResponse(response);
}

/**
 * Register a new user
 * @async
 * @param {Object} userData - The registration data
 * @param {string} userData.name - User's name
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @returns {Promise<Object>} User data
 * @throws {Error} If registration fails
 */
export async function registerUser(userData) {
  const headers = {
    ...apiConfig.headers,
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify(userData),
  });

  return handleApiResponse(response);
}

/**
 * Get user profile
 * @async
 * @param {string} username - Username to fetch profile for
 * @returns {Promise<Object>} User profile data
 * @throws {Error} If request fails
 */
export async function getUserProfile(username) {
  const response = await fetch(`${API_BASE_URL}/holidaze/profiles/${username}`, {
    headers: getAuthHeaders(),
  });

  return handleApiResponse(response);
}

/**
 * Update user profile
 * @async
 * @param {string} username - Username to update
 * @param {Object} profileData - Profile data to update
 * @returns {Promise<Object>} Updated profile data
 * @throws {Error} If update fails
 */
export async function updateUserProfile(username, profileData) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/profiles/${username}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(profileData),
  });

  return handleApiResponse(response);
}

/**
 * Get all venues
 * @async
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of venues to fetch
 * @param {number} options.offset - Offset for pagination
 * @param {string} options.sort - Sort field
 * @param {string} options.sortOrder - Sort order (asc/desc)
 * @returns {Promise<Object>} Venues data
 * @throws {Error} If request fails
 */
export async function getVenues(options = {}) {
  const { limit = 100, offset = 0, sort = 'created', sortOrder = 'desc' } = options;
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    sort,
    sortOrder,
    _owner: 'true',
    _bookings: 'true',
  });

  const response = await fetch(`${API_BASE_URL}/holidaze/venues?${queryParams}`, {
    headers: getAuthHeaders(),
  });

  return handleApiResponse(response);
}

/**
 * Search venues by query term
 * @async
 * @param {string} searchTerm - Search query
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of venues to fetch
 * @param {number} options.offset - Offset for pagination
 * @returns {Promise<Object>} Search results
 * @throws {Error} If request fails
 */
export async function searchVenues(searchTerm, options = {}) {
  const { limit = 100, offset = 0 } = options;
  const queryParams = new URLSearchParams({
    q: searchTerm,
    limit: limit.toString(),
    offset: offset.toString(),
    _owner: 'true',
    _bookings: 'true',
  });

  const response = await fetch(`${API_BASE_URL}/holidaze/venues/search?${queryParams}`, {
    headers: apiConfig.headers,
  });

  return handleApiResponse(response);
}

/**
 * Get a single venue by ID
 * @async
 * @param {string} venueId - Venue ID
 * @returns {Promise<Object>} Venue data
 * @throws {Error} If request fails
 */
export async function getVenue(venueId) {
  const response = await fetch(`${API_BASE_URL}/holidaze/venues/${venueId}?_owner=true&_bookings=true`, {
    headers: getAuthHeaders(),
  });

  return handleApiResponse(response);
}

/**
 * Create a new venue
 * @async
 * @param {Object} venueData - Venue data
 * @returns {Promise<Object>} Created venue data
 * @throws {Error} If creation fails
 */
export async function createVenue(venueData) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/venues`, {
    method: 'POST',
    headers,
    body: JSON.stringify(venueData),
  });

  return handleApiResponse(response);
}

/**
 * Update a venue
 * @async
 * @param {string} venueId - Venue ID
 * @param {Object} venueData - Updated venue data
 * @returns {Promise<Object>} Updated venue data
 * @throws {Error} If update fails
 */
export async function updateVenue(venueId, venueData) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/venues/${venueId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(venueData),
  });

  return handleApiResponse(response);
}

/**
 * Delete a venue
 * @async
 * @param {string} venueId - Venue ID
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export async function deleteVenue(venueId) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/venues/${venueId}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.errors?.[0]?.message || 'Failed to delete venue');
  }
}

/**
 * Create a booking
 * @async
 * @param {Object} bookingData - Booking data
 * @param {string} bookingData.venueId - Venue ID
 * @param {string} bookingData.dateFrom - Start date
 * @param {string} bookingData.dateTo - End date
 * @param {number} bookingData.guests - Number of guests
 * @returns {Promise<Object>} Created booking data
 * @throws {Error} If booking fails
 */
export async function createBooking(bookingData) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/bookings`, {
    method: 'POST',
    headers,
    body: JSON.stringify(bookingData),
  });

  return handleApiResponse(response);
}

/**
 * Get user bookings
 * @async
 * @param {string} username - Username
 * @returns {Promise<Object>} User bookings data
 * @throws {Error} If request fails
 */
export async function getUserBookings(username) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/profiles/${username}/bookings?_venue=true`, {
    headers,
  });

  return handleApiResponse(response);
}

/**
 * Delete a booking
 * @async
 * @param {string} bookingId - Booking ID
 * @returns {Promise<void>}
 * @throws {Error} If deletion fails
 */
export async function deleteBooking(bookingId) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/bookings/${bookingId}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.errors?.[0]?.message || 'Failed to delete booking');
  }
}

/**
 * Get user venues
 * @async
 * @param {string} username - Username
 * @returns {Promise<Object>} User venues data
 * @throws {Error} If request fails
 */
export async function getUserVenues(username) {
  const headers = {
    ...getAuthHeaders(),
    'X-Noroff-API-Key': import.meta.env.VITE_API_KEY
  };

  const response = await fetch(`${API_BASE_URL}/holidaze/profiles/${username}/venues?_bookings=true`, {
    headers,
  });

  return handleApiResponse(response);
} 