# STTB WebAPI Endpoints Report

This report lists the available endpoints in the STTB WebAPI and their expected return behavior. All endpoints are prefixed with `api/v1`.

## Endpoints Summary

### Academics (`/academics`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `get-available-programs` | GET | List all available academic programs. | JSON list of programs. |
| `get-program/{slug}` | GET | Get details for a specific program. | JSON object of the program. |
| `get-academic-requirements` | GET | List academic requirements. | JSON list of requirements. |

### Admissions (`/admissions`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `get-admission-schedule` | GET | Get the current admission schedule. | JSON object of the schedule. |
| `get-all-admission-costs` | GET | List all admission-related costs. | JSON list of costs. |

### Donations (`/donations`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `add-donor-member` | POST | Register a new donor member. | Success/Failure status. |

### Events (`/events`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `get-available-events` | GET | List all upcoming events. | JSON list of events. |
| `get-event/{slug}` | GET | Get details for a specific event. | JSON object of the event. |
| `get-all-organizers` | GET | List all event organizers. | JSON list of organizers. |
| `get-all-categories` | GET | List all event categories. | JSON list of categories. |

### Libraries (`/libraries`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `add-library-member` | POST | Register a new library member. | Success/Failure status. |

### Media (`/media`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `get-available-media/{media_format}` | GET | List media of a specific format (e.g., video, article). | JSON list of media. |
| `get-media-categories` | GET | List all media categories. | JSON list of categories. |
| `get-journal/{slug}` | GET | Get details for a specific journal. | JSON object of the journal. |
| `get-article/{slug}` | GET | Get details for a specific article. | JSON object of the article. |
| `get-video/{slug}` | GET | Get details for a specific video. | JSON object of the video. |

### News (`/news`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `get-available-news` | GET | List all available news items. | JSON list of news items. |
| `get-news/{slug}` | GET | Get details for a specific news item. | JSON object of the news item. |
| `get-all-categories` | GET | List all news categories. | JSON list of categories. |

### Profiles (`/profiles`)
| Endpoint | Method | Description | Return Result |
| :--- | :--- | :--- | :--- |
| `get-all-lecturers` | GET | List all lecturers. | JSON list of lecturers (Success). |
| `get-all-administrators` | GET | List all administrators. | JSON list of administrators (Success). |

## Example Responses

### Academics - Available Programs
```json
{
    "items": [
        {
            "programName": "Theology",
            "slug": "theology",
            "totalCredit": 36
        }
    ]
}
```

### Admissions - Schedule
```json
{
    "firstBatchDeadline": "2020-03-31T23:59:59Z",
    "secondBatchDeadline": "2020-05-31T23:59:59Z",
    "thirdBatchDeadline": "2020-08-31T23:59:59Z"
}
```

### Events - Available Events
```json
{
    "items": [
        {
            "eventTitle": "Seminar Teologi",
            "slug": "seminar-teologi",
            "eventDate": "2026-09-01T00:00:00Z",
            "organizer": "Prodi Teologi"
        }
    ],
    "pageNumber": 1,
    "pageSize": 5,
    "totalEvents": 10,
    "totalPages": 2
}
```

### News - Available News
```json
{
    "items": [
        {
            "id": 1,
            "title": "Wisuda 2026",
            "slug": "wisuda-2026",
            "category": ["Akademik"]
        }
    ],
    "pageNumber": 1,
    "pageSize": 5,
    "totalNews": 10,
    "totalPages": 2
}
```

### Media - Available Media (Video)
```json
{
    "items": [
        {
            "id": 12,
            "title": "Video Introduction",
            "slug": "video-intro",
            "category": ["Iman"]
        }
    ],
    "pageNumber": 1,
    "pageSize": 5,
    "totalMedia": 9,
    "totalPages": 2
}
```

### Profiles - All Lecturers
```json
{
    "items": [
        {
            "id": 1,
            "lecturerName": "Ricardo",
            "degrees": ["M.Mus.", "S.Kom."]
        }
    ]
}
```

> [!NOTE]
> All endpoints are now functioning correctly. The database schema appears to be synchronized.
