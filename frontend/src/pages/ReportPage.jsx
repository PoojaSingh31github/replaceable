import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import reportsService from "../services/reportsService";
import GoaReport from "./GoaReport";

const ReportPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await reportsService.getReportBySlug(slug);

        // Transform API data to match GoaReport's expected format
        const transformedData = {
          cover: {
            reportMeta: data.cover?.reportMeta || "Strategic Foresight Report",
            title: data.cover?.title || data.title,
            subtitle: data.cover?.subtitle || data.subtitle,
            stats: data.cover?.stats || [],
          },
          navLinks: data.nav_links || [],
          executiveSummary: {
            paragraphs: data.executive_summary?.paragraphs || [],
            cards: data.executive_summary?.cards || [],
          },
          prologue: data.prologue || "",
          methodology: {
            sources: data.methodology?.sources || [],
            assumptions: data.methodology?.assumptions || [],
            rpiFramework: data.methodology?.rpiFramework || "",
          },
          roles: (data.roles || []).map((role) => ({
            number: role.role_number,
            title: role.title,
            emergencePeriod: role.emergence_period,
            origin: role.origin,
            confidence: role.confidence,
            confidenceClass: role.confidence?.toLowerCase().includes("high")
              ? "confidence-high"
              : role.confidence?.toLowerCase().includes("speculative")
              ? "confidence-speculative"
              : "confidence-moderate",
            narrative: role.narrative,
            rpiScore: role.rpi_score,
            tasks: (role.tasks || []).map((task) => ({
              task: task.task,
              aps: task.aps,
              w: task.w,
              hrf: task.hrf,
              hrat: task.hrat,
            })),
            gaugeInfo: role.gauge_info,
            causalChain: role.causal_chain,
          })),
          charts: data.charts || {},
          scenarios: (data.scenarios || []).map((scenario) => ({
            type: scenario.type,
            title: scenario.title,
            description: scenario.description,
            outcome: scenario.outcome,
            indicatorLabel: scenario.indicators?.title || "Indicators",
            indicatorText: scenario.indicators?.text || "",
          })),
          // Transform implications from snake_case to camelCase and description to desc
          implications: {
            policymakers: (data.implications?.policymakers || []).map((item) => ({
              title: item.title,
              desc: item.description || item.desc,
            })),
            industryLeaders: (data.implications?.industry_leaders || data.implications?.industryLeaders || []).map((item) => ({
              title: item.title,
              desc: item.description || item.desc,
            })),
            individuals: (data.implications?.individuals || []).map((item) => ({
              title: item.title,
              desc: item.description || item.desc,
            })),
          },
          cta: data.cta || {},
        };

        setReportData(transformedData);
      } catch (err) {
        console.error("Error fetching report:", err);
        setError("Report not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchReport();
    }
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0f0f",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #333",
              borderTopColor: "#c41e3a",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          ></div>
          <p>Loading report...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0f0f",
          color: "#fff",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginBottom: "16px", color: "#c41e3a" }}>404</h2>
          <p style={{ marginBottom: "24px" }}>{error}</p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 24px",
              background: "#c41e3a",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return <GoaReport reportData={reportData} />;
};

export default ReportPage;
