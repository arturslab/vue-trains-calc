import { computed } from "vue";

export default {
    name: "CalculatorMixin",
    data() {
        return {
            // Define the default units for each type of calculation
            unitsSi: {
                time: "h",
                distance: "km",
                velocity: "kmphr",
            },
        };
    },
    computed: {
        unitsDictionary() {
            return {
                velocity: [
                    {
                        value: "kmphr",
                        title: this.$t("velocityUnitKmPHr"),
                    },
                    {
                        value: "kmpm",
                        title: this.$t("velocityUnitKmPM"),
                    },
                    {
                        value: "kmps",
                        title: this.$t("velocityUnitKmPS"),
                    },
                    {
                        value: "mph",
                        title: this.$t("velocityUnitMPHr"),
                    },
                    {
                        value: "mpm",
                        title: this.$t("velocityUnitMPM"),
                    },
                    {
                        value: "mps",
                        title: this.$t("velocityUnitMPS"),
                    },
                ],
                distance: [
                    {
                        value: "km",
                        title: this.$t("distanceUnitKm"),
                    },
                    {
                        value: "m",
                        title: this.$t("distanceUnitM"),
                    },
                ],
                time: [
                    {
                        value: "h",
                        title: this.$t("timeUnitH"),
                    },
                    {
                        value: "min",
                        title: this.$t("timeUnitMin"),
                    },
                    {
                        value: "s",
                        title: this.$t("timeUnitS"),
                    },
                ],
            };
        },
    },
    methods: {
        convertVelocity(speed, from, to) {
            const units = {
                'kmphr': 1, // km/h
                'kmpm': 1 / 60, // km/min
                'kmps': 1 / 3600, // km/sec
                'mph': 1000, // m/h
                'mpm': 1000 / 60, // m/min
                'mps': 1000 / 3600, // m/sec
            };
            return speed * units[to] / units[from];
        },
        convertDistance(distance, from, to) {
            const units = {
                'km': 1,
                'm': 1000,
            };
            return distance * units[to] / units[from];
        },
        convertTime(time, from, to) {

            const units = {
                'h': 1,
                'min': 60,
                's': 3600,
            };
            return time * units[to] / units[from];
        },
        convertUnits(value, from, to, type) {
            if (from === to) return value;
            if (type === 'velocity') return this.convertVelocity(value, from, to);
            if (type === 'distance') return this.convertDistance(value, from, to);
            if (type === 'time') return this.convertTime(value, from, to);
        },

        // Normalize the units to the SI units (km/h, km, h) and convert the value to the SI unit
        // If the unit is already in SI, return the value and unit as is
        normalizeUnits(value, unit, type) {
            if (unit === this.unitsSi[type]) return { value, unit };
            if (value === null || value === undefined) return {value: null, unit: null};

            const units = {
                'velocity': ['kmphr', 'kmpm', 'kmps', 'mph', 'mpm', 'mps'],
                'distance': ['km', 'm'],
                'time': ['h', 'min', 's'],
            };
            const unitIndex = units[type].indexOf(unit);
            if (unitIndex === -1) return null;

            const normalizedValue = this.convertUnits(value, unit, units[type][0], type);
            return { value: normalizedValue, unit: units[type][0] };
        },

        // Calculate time to meet when we know the distance, speed of two objects (first object is at 0 distance and second object is at distance)
        calculateTimeToMeet(distance, speed1, speed2) {
            const relativeSpeed = speed1 + speed2;
            const time = distance / relativeSpeed;
            return time;
        },

        calculateDistanceAfterTime(time, speed) {
            const distance = time * speed;
            return distance;
        },

        // Calculate distance from start to meet when we know the time, speed of two objects (first object is at 0 distance and second object is at distance)
        calculateDistanceToMeet(time, speed1, speed2) {
                const relativeSpeed = speed1 + speed2;
                const distance = time * relativeSpeed;
                return distance;
        },

        convertHoursToHumanReadable(hours) {
            const days = Math.floor(hours / 24);
            const hoursLeft = hours % 24;
            const minutes = Math.floor((hoursLeft - Math.floor(hoursLeft)) * 60);

            const daysStr = days > 0 ? `${days} ${this.$t("timeUnitDShort")}` : "";
            const hoursStr = hoursLeft > 0 ? `${Math.floor(hoursLeft)} ${this.$t("timeUnitHShort")}` : "";
            const minutesStr = minutes > 0 ? `${minutes} ${this.$t("timeUnitMShort")}` : "";
            return `${daysStr} ${hoursStr} ${minutesStr}`.trim();
        }   
    },
};
