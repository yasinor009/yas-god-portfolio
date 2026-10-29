import unittest
from distance_api import estimate_distance

class DistanceTests(unittest.TestCase):
    def test_reference_calibration(self):
        self.assertAlmostEqual(estimate_distance(0.3, 2400, 60), 12.0)

    def test_double_apparent_width_halves_distance(self):
        self.assertAlmostEqual(estimate_distance(0.3, 2400, 120), 6.0)

    def test_invalid_measurements(self):
        for invalid in (0, -1, float('nan'), float('inf'), True, '60', 1e20):
            for position in range(3):
                values = [0.3, 2400, 60]
                values[position] = invalid
                with self.subTest(value=invalid, position=position), self.assertRaises(ValueError):
                    estimate_distance(*values)

if __name__ == '__main__':
    unittest.main()
